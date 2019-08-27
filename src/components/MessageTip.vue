<template>
  <div class="message" v-if="msg">
    <span>{{msg}}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MessageTip extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
$base: 75;
.message{
  position: fixed;
  z-index: 999;
  left: 0;
  top: 50%;
  width: 100%;
  box-sizing: border-box;
  padding: 0 30px;
  text-align: center;
  span{
    display: inline-block;
    background: #000;
    border-radius: 10rem / $base;
    color: #fff;
    padding:15rem/$base 20rem / $base;
    font-size: 24rem/$base;
  }
}
</style>
