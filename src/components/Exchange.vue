<template>
  <div class="modal exchange" v-show="show">
    <div>
      <a class="close activeScale" @click="triggerShow"></a>
      <div class="form-container">
        <input placeholder="请输入游戏账号" />
        <input placeholder="请输入兑换的金额" />
      </div>
      <button>确认兑换</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { setBodyScroll } from "../utils/utils";

@Component
export default class Exchange extends Vue {
  @Prop() show!: boolean;

  public triggerShow() {
    this.$emit("setState");
  }
}
</script>

<style lang="scss">
$base: 75;
</style>
