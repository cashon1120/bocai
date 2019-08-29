<template>
  <div class="number-outer">
    <div class="number-container" ref="container" :style="{height:scrollHeight}">
      <ul class="number" ref="numberul" :style="{transform: `translate3d(0, ${endTop}px, 0)`}">
        <li
          :style="{height:scrollHeight}"
          v-for="(item, index) in numberList"
          :key="index"
          :class="`number-${item}`"
        ></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class Number extends Vue {
  @Prop() private toNumber!: number;
  numberList: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  containerDom: any = null;
  numberUl: any = null;
  timer: any = null;
  scrollHeight: string = "";
  endTop: number = 0;

  mounted() {
    this.containerDom = this.$refs.container;
    this.numberUl = this.$refs.numberul;
    this.scrollHeight = this.containerDom.offsetHeight + "px";
  }

  @Watch("toNumber", { immediate: true, deep: true })
  setAnimation(val: number, oldVal: number) {
    this.endTop = -val * parseInt(this.scrollHeight);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
$base: 75;
.number-outer {
  width: 119rem / $base;
  height: 225rem / $base;
  margin: auto;
  text-align: center;
  background: url(../assets/number_bg.png) no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding-top: 5rem / $base;
  .number-container {
    margin: auto;
    width: 110rem / $base;
    height: 215rem / $base;
    overflow: hidden;
    position: relative;
    border-radius: 55rem / $base;
  }
  .number {
    position: absolute;
    width: 100%;
    top: 0;
    transition: all 2s ease-in-out 0s;
    li {
      width: 110rem / $base;
      height: 215rem / $base;
      background-size: 60% 50%;
      background-repeat: no-repeat;
      background-position: center center;
      &.number-0 {
        background-image: url(../assets/0.png);
      }
      &.number-1 {
        background-image: url(../assets/1.png);
      }
      &.number-2 {
        background-image: url(../assets/2.png);
      }
      &.number-3 {
        background-image: url(../assets/3.png);
      }
      &.number-4 {
        background-image: url(../assets/4.png);
      }
      &.number-5 {
        background-image: url(../assets/5.png);
      }
      &.number-6 {
        background-image: url(../assets/6.png);
      }
      &.number-7 {
        background-image: url(../assets/7.png);
      }
      &.number-8 {
        background-image: url(../assets/8.png);
      }
      &.number-9 {
        background-image: url(../assets/9.png);
      }
    }
  }
}
</style>
