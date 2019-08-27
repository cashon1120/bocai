<template>
  <div class="modal recharge" v-show="show">
    <div>
      <a class="close activeScale" @click="triggerShow"></a>
      <div>充值方式</div>
      <div class="flex-container type">
        <div @click="handleSelectType('weixin')">
          <span :class="payType === 'weixin' ? 'active' : null"></span>微信
        </div>
        <div @click="handleSelectType('zhifubao')">
          <span :class="payType === 'zhifubao' ? 'active' : null"></span>支付宝
        </div>
      </div>
      <div>充值金额</div>
      <ul class="money" @click="handleSelectMoney">
        <li data-value="30" :class="payMoney === '30' ? 'active' : null">30</li>
        <li data-value="50" :class="payMoney === '50' ? 'active' : null">50</li>
        <li data-value="100" :class="payMoney === '100' ? 'active' : null">100</li>
        <li data-value="300" :class="payMoney === '300' ? 'active' : null">300</li>
        <li data-value="500" :class="payMoney === '500' ? 'active' : null">500</li>
        <li data-value="1000" :class="payMoney === '1000' ? 'active' : null">1000</li>
        <li data-value="2000" :class="payMoney === '2000' ? 'active' : null">2000</li>
      </ul>
      <button @click="handleSubmit">下一步</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { setBodyScroll } from "../utils/utils";

@Component
export default class Recharge extends Vue {
  @Prop() show!: boolean;
  payType: string = "";
  payMoney: string = "";
  errorMsg: string = "";

  public triggerShow() {
    this.$emit("setState");
  }

  public handleSelectType(type: string) {
    this.payType = type;
  }

  public handleSelectMoney(e: any) {
    const money = e.target.dataset.value;
    this.payMoney = money;
  }

  public handleSubmit() {
    const { payType, payMoney } = this;
    if (payType === "") {
      this.$emit('showError', '请选择支付类型')
      return
    }
    if (payMoney === "") {
      this.$emit('showError', '请选择充值金额')
      return
    }

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
    li {
      width: 110rem / $base;
      height: 55rem / $base;
      display: inline-block;
      border: 1px solid #d87f29;
      border-radius: 10rem / $base;
      line-height: 55rem / $base;
      margin: 15rem / $base;
      text-align: center;
      &:active, &.active {
        border: 1px solid #fff;
        color: #fff;
      }
    }
  }
}
</style>
