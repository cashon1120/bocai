<template>
  <div class="modal recharge" v-show="show">
    <div>
      <a class="close activeScale" @click="triggerShow"></a>
      <div>充值方式</div>
      <div class="flex-container type">
        <div>
          <span></span>微信
        </div>
        <div>
          <span></span>支付宝
        </div>
      </div>
      <div>充值金额</div>
      <ul class="money">
        <li>30</li>
        <li>50</li>
        <li>100</li>
        <li>300</li>
        <li>500</li>
        <li>1000</li>
        <li>2000</li>
      </ul>
      <button>下一步</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { setBodyScroll } from "../utils/utils";

@Component
export default class Recharge extends Vue {
  @Prop() show!: boolean;

  public triggerShow() {
    this.$emit('setState')
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
      &:active {
        border: 1px solid #fff;
      }
    }
  }
}
</style>
