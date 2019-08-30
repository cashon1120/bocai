<template>
  <div class="modal">
    <div class="modalContent introduce">
      <h3>下注记录</h3>
      <a class="close activeScale" @click="setState('playRecord')"></a>
      <div class="content">
        
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { setBodyScroll } from '../utils/utils'

@Component
export default class PlayIntroduce extends Vue {
  @Emit()
  setState(){}
}
</script>

<style lang="scss">
$base: 75;
.introduce {
  background: url(../assets/play_introduce_bg.png) no-repeat;
  background-size: 100% 100%;
  height: 810rem / $base;
  width: 100%;
  box-sizing: border-box;
  padding: 40rem / $base 55rem / $base 30rem / $base 55rem / $base;
  h3 {
    color: #d87f29;
    font-size: 30rem / $base;
  }
  .content {
    text-align: left;
    height: 600rem / $base;
    overflow: auto;
    font-size: 24rem / $base;
    dl {
      margin-bottom: 25rem / $base;
      dd {
        padding-left: 40rem / $base;
      }
    }
  }
}
</style>
