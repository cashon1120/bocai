<template>
  <div class="modal login" v-show="show">
    <div :class="!isLogin ? 'modalContent isReg' : 'modalContent'">
      <a class="close activeScale" @click="setState"></a>
      <div class="form-container">
        <div class="form-type flex-container">
          <div class="flex-1" @click="handleChangeType(true)">
            <span :class="isLogin ? 'active' : null">登录</span>
          </div>
          <div class="flex-1" @click="handleChangeType(false)">
            <span :class="!isLogin ? 'active' : null">注册</span>
          </div>
        </div>
        <div>
          <input placeholder="账号" v-model="account" />
          <input placeholder="登录密码" v-model="password" />
        </div>
        <div v-if="!isLogin">
          <input placeholder="银行卡号" v-model="cardNumber" />
          <input placeholder="真实姓名" v-model="name" />
        </div>
      </div>
      <button :disabled="disabled" @click="handleSubmit">{{isLogin ? '登录' : '注册'}}</button>
    </div>
    <Loading v-show="disabled" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { setBodyScroll, showMessage } from "../utils/utils";
import Loading from "./Loading.vue";

@Component({
  components: {
    Loading
  }
})
export default class Login extends Vue {
  @Prop() show!: boolean;
  isLogin: boolean = true;
  disabled: boolean = false;
  account: string = "";
  password: string = "";
  cardNumber: string = "";
  name: string = "";

  @Emit()
  setState() {}

  // 切换 登录/注册界面
  public handleChangeType(tag: boolean) {
    this.isLogin = tag;
  }

  // 提交
  // 提交
  public handleSubmit() {
    const { account, password, cardNumber, name, isLogin } = this;
    if (account === "") {
      showMessage("请输入账号");
      return;
    }
    if (password === "") {
      showMessage("请输入密码");
      return;
    }
    if (!isLogin) {
      if (cardNumber === "") {
        showMessage("请输入银行卡号");
        return;
      }
      if (name === "") {
        showMessage("请输入姓名");
        return;
      }
    }
    this.disabled = true;
    const params = {
      account,
      password,
      cardNumber,
      name
    }
    if(isLogin){
      delete params.cardNumber
      delete params.name
    }
    const url = isLogin ? '/url1' : '/url2'
    this.$post(url, {
      ...params
    }).then((res: any) => {
      this.disabled = false;
      if (res.code === 1) {
        showMessage("成功");
        this.submitSuccess(res)
        return;
      }
      showMessage("失败");
    });
  }

  @Emit()
  submitSuccess(res: any){
    
  }
}
</script>

<style lang="scss">
$base: 75;
.login {
  .isReg {
    background: url(../assets/modal_bg_reg.png) no-repeat center center !important;
    background-size: 100% 100% !important;
    min-height: 780rem / $base !important;
  }
  .form-type {
    margin-bottom: 20rem / $base;
    padding: 1px;
    background: #501414;
    border-radius: 10rem / $base;
    color: #fff;
    span {
      display: block;
      padding: 10rem / $base;
      border-radius: 8rem / $base;
      &.active {
        background: #d87f29;
      }
    }
  }
  .form-container {
    input {
      margin-top: 45rem / $base !important;
    }
  }
}
</style>
