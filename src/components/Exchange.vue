<template>
  <div class="modal exchange">
    <div class="modalContent">
      <a class="close activeScale" @click="setState('exchange')"></a>
      <div class="form-container">
        <input placeholder="请输入游戏账号" v-model="account" />
        <input placeholder="请输入兑换的金额" v-model="money" />
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

@Component({
  components: {
    Loading
  }
})
export default class Exchange extends Vue {
  account: string = "";
  money: string = "";
  disabled: boolean = false;

  @Emit()
  setState() {}

  // 提交
  public handleSubmit() {
    const { account, money } = this;
    if (account === "") {
      showMessage("请输入账号");
      return;
    }
    if (money === "") {
      showMessage("请输入兑换金额");
      return;
    }
    this.disabled = true;
    this.$post("/url", {
      account,
      money
    }).then((res: any) => {
      this.disabled = false;
      if (res.code === 1) {
        showMessage("成功");
        return;
      }
      showMessage("失败");
    });
  }
}
</script>

<style lang="scss">
$base: 75;
</style>
