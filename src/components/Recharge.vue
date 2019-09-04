<template>
  <div class="modal recharge">
    <div class="modalContent">
      <a class="close activeScale" @click="handleClose"></a>
      <div v-if="!showImg">
        <div>充值方式</div>
        <div class="flex-container type">
          <div @click="handleSelectType('weixin')">
            <span :class="payType === 'weixin' ? 'active' : null"></span>微信
          </div>
          <div @click="handleSelectType('alipay')">
            <span :class="payType === 'alipay' ? 'active' : null"></span>支付宝
          </div>
        </div>
        <div>充值金额</div>
        <ul class="money" @click="handleSelectMoney">
          <li
            v-for="item in configList"
            :key="item.id"
            :data-value="item.key"
            :class="payMoney === item.key ? 'active' : null"
          >{{item.key}}</li>
        </ul>
        <button :disabled="disabled" @click="handleSubmit">下一步</button>
      </div>
      <div class="code" v-else>
        <span>￥{{payInfo.money}}</span>
        <img :src="payInfo.imgUrl" :onerror="showErrorMsg" alt="支付码" />
        <div v-if="payType === 'weixin'">截屏保存二维码，在微信扫一扫中打开识别付款</div>
        <div v-else>截屏保存二维码，在支付宝扫一扫中打开识别付款</div>
        <div>支付成功后，请手动刷新余额</div>
      </div>
    </div>
    <Loading v-show="disabled || loading" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue, Emit } from "vue-property-decorator";
import { setBodyScroll, showMessage, randomNum } from "../utils/utils";
import Loading from "./Loading.vue";

interface IpayInfo{
  money: number
  imgUrl: string
}

@Component({
  components: {
    Loading
  }
})
export default class Recharge extends Vue {
  @Prop() private configList!: any[];
  payType: string = "";
  payMoney: string = "";
  errorMsg: string = "";
  disabled: boolean = false;
  loading: boolean = false;
  showImg: boolean = false;
  payInfo: any = {
    money: 0,
    imgUrl: ''
  }
  dataList: any[] = [];

  // 调用父组件, 隐藏弹出框
  @Emit()
  setState(type: string) {}

  mounted() {
    if(this.$props.configList.length === 0){
      showMessage('加载配置失败, 请刷新重试');
    }
  }

  public handleClose() {
    this.payType = "";
    this.payMoney = "";
    this.showImg = false;
    this.setState("recharge");
  }

  // 选择支付类型
  public handleSelectType(type: string) {
    this.payType = type;
  }

  // 选择支付金额
  public handleSelectMoney(e: any) {
    this.payMoney = e.target.dataset.value;
  }

  // 提交
  public handleSubmit() {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      showMessage("请先登录");
      return;
    }
    const { payType, payMoney } = this;
    if (payType === "") {
      showMessage("请选择支付类型");
      return;
    }
    if (payMoney === "") {
      showMessage("请选择充值金额");
      return;
    }
    this.setPayInfo();
    this.disabled = true;
    this.$post("/pc/pay/caeate_order", {
      userId,
      type: payType,
      money: payMoney
    })
      .then((res: any) => {
        this.disabled = false;
        if (res.success) {
          showMessage(res.msg);
          return;
        }
        showMessage(res.msg);
      })
      .catch(() => {
        this.disabled = false;
      });
  }

  public setPayInfo() {
    const { payType, payMoney } = this;
    this.$props.configList.forEach((item: any, index: number) => {
      if (item.key === payMoney) {
        const index = randomNum(0, item.shopList.length - 1);
        if(payType === 'weixin'){
        this.payInfo.imgUrl = item.shopList[index].wx_url
        }else{
          this.payInfo.imgUrl = item.shopList[index].ali_url
        }
        this.payInfo.money = item.shopList[index].money
        this.showImg = true
      }
    });
  }

  public showErrorMsg(){
    showMessage('图片加载失败')
  }
}
</script>

<style lang="scss">
$base: 75;
.recharge {
  .type {
    text-align: center;
    width: 70%;
    margin: 10rem / $base auto;
    div {
      flex: 1;
      span {
        display: inline-block;
        width: 25rem / $base;
        height: 25rem / $base;
        background: url(../assets/check.png) no-repeat center;
        background-size: 100% 100%;
        vertical-align: middle;
        margin-right: 10rem / $base;
        position: relative;
        top: -3rem / $base;
        &.active {
          background: url(../assets/checked.png) no-repeat center;
          background-size: 100% 100%;
        }
      }
    }
  }
  .money {
    overflow: auto;
    width: 80%;
    margin: auto;
    text-align: left;
    padding-left: 4%;
    padding-bottom: 15rem / $base;
    li {
      width: 110rem / $base;
      height: 55rem / $base;
      display: inline-block;
      border: 1px solid #d87f29;
      border-radius: 10rem / $base;
      line-height: 55rem / $base;
      margin: 15rem / $base;
      text-align: center;
      &:active,
      &.active {
        border: 1px solid #fff;
        color: #fff;
      }
    }
  }

  .code {
    text-align: center;
    span {
      font-size: 45rem / $base;
      font-weight: bold;
      display: block;
      padding: 10rem / $base;
    }
    img {
      width: 260rem / $base;
      height: 260rem / $base;
      margin-bottom: 10rem / $base;
    }
  }
}
</style>
