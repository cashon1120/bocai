<template>
  <div class="modal exchange">
    <div class="modalContent">
      <a class="close activeScale" @click="setState('exchange')"></a>
      <div class="form-container">
        <input placeholder="请输入游戏账号" :value="userName" disabled />
        <input placeholder="请输入游戏账号" :value="bankNum" disabled />
        <input placeholder="请输入兑换的金额" v-model="formData.money" />
      </div>
      <button :disabled="disabled" @click="handleSubmit">确认兑换</button>
    </div>
    <Loading v-show="disabled" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { setBodyScroll, showMessage } from "../utils/utils";
import Loading from "./Loading.vue";

interface IformData {
  money: string | number;
}

@Component({
  components: {
    Loading
  }
})
export default class Exchange extends Vue {
  @Prop() private userInfo!: string;

  formData: IformData = {
    money: ""
  };
  bankNum: string = "";
  userName: string = "";

  disabled: boolean = false;

  mounted() {
    const num = this.$props.userInfo.bank_num.split("");
    const name = this.$props.userInfo.account_name.split("");
    for (let i = 0; i < num.length; i += 1) {
      if (i > 3 && i < num.length - 4) {
        num[i] = "*";
      }
    }
    this.bankNum = num.join("");
    for (let i = 0; i < name.length; i += 1) {
      if (i < name.length - 1) {
        name[i] = "*";
      }
    }
    this.userName = name.join("");
  }

  @Emit()
  setState(type: string) {}

  // 提交
  public handleSubmit() {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      showMessage("请先登录");
      return;
    }
    const {
      formData: { money }
    } = this;
    if (money === "") {
      showMessage("请输入兑换金额");
      return;
    }
    this.disabled = true;
    this.$post("/pc/pay/withdrawal", {
      userId,
      money
    }).then((res: any) => {
      this.disabled = false;
      if (res.success) {
        showMessage(res.msg);
        this.submitSuccess();
        return;
      }
      showMessage(res.msg);
    });
  }

  @Emit()
  submitSuccess() {}
}
</script>

<style lang="scss">
$base: 75;
.exchange {
  input {
    margin-top: 35rem / $base;
  }
  input:disabled,
  input[disabled] {
    color: #fbfbfb !important;
  }
}
</style>
