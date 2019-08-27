<template>
  <div class="number-outer">
    <div class="number-container">
      <ul class="number">
        <li class="number-0"></li>
        <li class="number-1"></li>
        <li class="number-2"></li>
        <li class="number-3"></li>
        <li class="number-4"></li>
        <li class="number-5"></li>
        <li class="number-6"></li>
        <li class="number-7"></li>
        <li class="number-8"></li>
        <li class="number-9"></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Number extends Vue {
  @Prop() private msg!: string;
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
  padding-top: 30rem/$base;
  .number-container {
    margin: auto;
    width: 110rem / $base;
    height: 155rem / $base;
    overflow: hidden;
  }
  .number {
    li {
      width: 110rem / $base;
      height: 155rem / $base;
      background-size: 80% 80%;
      background-repeat: no-repeat;
      background-position: center center;
      &.number-0 {
        background-image: url(../assets/0.png);
      }
    }
  }
}
</style>
