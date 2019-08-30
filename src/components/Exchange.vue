<template>
  <div class="modal exchange">
    <div class="modalContent">
      <a class="close activeScale" @click="setState('exchange')"></a>
      <div class="form-container">
        <input placeholder="请输入游戏账号" v-model="formData.gameAccount" />
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
  gameAccount: string;
  money: string | number;
}

@Component({
  components: {
    Loading
  }
})
export default class Exchange extends Vue {
  formData: IformData = {
    gameAccount: "",
    money: ""
  };

  disabled: boolean = false;

  @Emit()
  setState(type: string) {}

  // 提交
  public handleSubmit() {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      showMessage("请先登录");
      return;
    }
    const { formData: {gameAccount, money} } = this;
    if (gameAccount === "") {
      showMessage("请输入账号");
      return;
    }
    if (money === "") {
      showMessage("请输入兑换金额");
      return;
    }
    this.disabled = true;
    this.$post("/pc/pay/withdrawal", {
      userId,
      gameAccount,
      money
    }).then((res: any) => {
      this.disabled = false;
      if (res.success) {
        showMessage(res.msg);
        this.setState('exchange')
        return;
      }
      showMessage(res.msg);
    });
  }
}
</script>

<style lang="scss">
$base: 75;
</style>
