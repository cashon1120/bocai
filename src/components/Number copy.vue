<template>
  <div class="number-outer">
    <div class="hidebox" ref="hidebox"></div>
    <div class="number-container" ref="container" :style="{height:scrollHeight+'px'}">
      <transition>
        <ul
          class="number"
          ref="numberUrl"
          id="numberUrl"
          :style="{transition: `all ${scrollTime}s ${scrollType} ${numberIndex}s`,transform: `translate3d(0, ${endTop}px, 0)`}"
        >
          <li
            :style="{height:scrollHeight +'px'}"
            v-for="(item, index) in numberList"
            :key="index"
            :class="`number-${item}`"
          ></li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class Number extends Vue {
  @Prop() private toNumber!: number;
  @Prop() private autoScroll!: boolean;
  @Prop() private index!: number;

  numberList: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  hideboxDom: any = null; // 用来获取高度,以设置 scrollHeight
  timer: any = null;
  scrollHeight: number = 0;

  endTop: number = 0;
  lastEndTop: number | undefined = undefined;

  isAuto: boolean = false;
  isAutoScrooling: boolean = false;
  numberUrl: any = null;
  numberIndex: number = 0;
  autoScrollClass: string = "autoScroll";

  scrollTime: number = 2;
  scrollType: string = "ease-in-out";

  mounted() {
    this.setScrollHeight();
    this.numberIndex = this.$props.index / 3.5;
    this.numberUrl = document.getElementById("numberUrl");
    this.numberUrl.addEventListener('webkitAnimationEnd', this.setAutoScroll);
    const that = this;
    window.addEventListener("resize", this.setScrollHeight);
  }

  // 设置动画高度, resize后也执行一次
  public setScrollHeight() {
    const _that = this;
    // 加一点延迟才能获取到
    setTimeout(() => {
      _that.hideboxDom = _that.$refs.hidebox;
      _that.scrollHeight = _that.hideboxDom.offsetHeight;
      _that.setAnimation(_that.$props.toNumber);
    }, 500);
  }

  @Watch("toNumber", { immediate: true, deep: true })
  setAnimation(val: number) {
    if (val >= 0) {
      this.endTop = -val * this.scrollHeight;
    }
  }

  @Watch("autoScroll", { immediate: true, deep: true })
  handleAutoScroll(val: boolean) {
    this.isAuto = val;
  }

  public setAutoScroll() {

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
  .hidebox {
    height: 215rem / $base;
    position: absolute;
    left: -100px;
  }
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
