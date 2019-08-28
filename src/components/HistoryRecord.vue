<template>
  <div class="history">
   <ul>
     <li>第2019082315450059期<span>【9】【1】【8】【7】【6】</span></li>
     <li>第2019082315450059期<span>【9】【1】【8】【7】【6】</span></li>
     <li>第2019082315450059期<span>【9】【1】【8】【7】【6】</span></li>
     <li>第2019082315450059期<span>【9】【1】【8】【7】【6】</span></li>
     <li>第2019082315450059期<span>【9】【1】【8】【7】【6】</span></li>
     <li>第2019082315450059期<span>【9】【1】【8】【7】【6】</span></li>
   </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HistoryRecord extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$base: 75;
.history{
  margin-top: 20rem/$base;
  background: url(../assets/history_record_bg.png) no-repeat;
  background-size: 100% 100%;
  height: 400rem / $base;
  text-align: center;
  box-sizing: border-box;
  padding-top: 100rem/$base;
  ul{
    width: 90%;
    margin: auto;
    font-size: 24rem / $base;
    color: #000;
    li{
      line-height: 1.6;
    }
    span{
      color: #fff;
      margin-left: 20rem/$base;
    }
  }
}
</style>
