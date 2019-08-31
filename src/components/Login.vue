<template>
  <div class="modal login">
    <div :class="!isLogin ? 'modalContent isReg' : 'modalContent'">
      <a class="close activeScale" @click="setState('loading')"></a>
      <form>
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
            <input placeholder="账号" v-model="formData.account" v-fixedInput="formData.account" />
            <input placeholder="登录密码" type="password" v-model="formData.pwd" v-fixedInput="formData.pwd" />
          </div>
          <div v-if="!isLogin">
            <input placeholder="银行卡号" type="number" v-model="formData.bank_num"  v-fixedInput="formData.bank_num" />
            <input placeholder="开户姓名" v-model="formData.account_name"  v-fixedInput="formData.account_name"/>
          </div>
        </div>
      </form>
      <button :disabled="disabled" @click="handleSubmit">{{isLogin ? '登录' : '注册'}}</button>
    </div>
    <Loading v-show="disabled" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { setBodyScroll, showMessage, luhnCheck } from "../utils/utils";
import Loading from "./Loading.vue";

interface IformData {
  account: string;
  pwd: string;
  bank_num: string;
  account_name: string;
}

@Component({
  components: {
    Loading
  }
})
export default class Login extends Vue {
  isLogin: boolean = true;
  disabled: boolean = false;
  formData: IformData = {
    account: "",
    pwd: "",
    bank_num: "",
    account_name: ""
  };

  @Emit()
  setState() {}

  // 切换 登录/注册界面
  public handleChangeType(tag: boolean) {
    this.isLogin = tag;
    this.formData = {
      account: "",
      pwd: "",
      bank_num: "",
      account_name: ""
    };
  }

  // 提交
  // 提交
  public handleSubmit() {
    const {
      formData: { account, pwd, bank_num, account_name },
      isLogin
    } = this;
    if (account === "") {
      showMessage("请输入账号");
      return;
    }
    if (pwd === "") {
      showMessage("请输入密码");
      return;
    }
    if (!isLogin) {
      if (!luhnCheck(bank_num)) {
        showMessage("请输入正确的银行卡号");
        return;
      }
      if (account_name === "") {
        showMessage("请输入开启行姓名");
        return;
      }
    }
    this.disabled = true;
    const params = {
      account,
      pwd,
      bank_num,
      account_name
    };
    if (isLogin) {
      delete params.bank_num;
      delete params.account_name;
    }
    const url = isLogin ? "/pc/user/login" : "/pc/user/register";
    this.$post(url, params)
      .then((res: any) => {
        this.disabled = false;
        if (res.success) {
          showMessage(res.msg);
          this.submitSuccess(res.data);
          return;
        }
        showMessage(res.msg);
      })
      .catch(() => {
        this.disabled = false;
      });
  }

  @Emit()
  submitSuccess(res: any) {}
}
</script>

<style lang="scss">
$base: 75;
.login {
  .isReg {
    background: url(../assets/modal_bg_reg.png) no-repeat center center !important;
    background-size: 100% 100% !important;
    min-height: 800rem / $base !important;
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
      margin-top: 40rem / $base !important;
    }
  }
}
</style>
