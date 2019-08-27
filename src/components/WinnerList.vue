<template>
  <div class="winner-list">
    <h3>获奖名单</h3>
    <div class="winner-container">
      <ul>
        <li>
          玩家[张**份]获得金币
          <span>200</span>
        </li>
        <li>
          玩家[张**份]获得金币
          <span>200</span>
        </li>
        <li>
          玩家[张**份]获得金币
          <span>200</span>
        </li>
        <li>
          玩家[张**份]获得金币
          <span>200</span>
        </li>
        <li>
          玩家[张**份]获得金币
          <span>200</span>
        </li>
        <li>
          玩家[张**份]获得金币
          <span>200</span>
        </li>
        <li>
          玩家[张**份]获得金币
          <span>200</span>
        </li>
        <li>
          玩家[张**份]获得金币
          <span>200</span>
        </li>
        <li>
          玩家[张**份]获得金币
          <span>200</span>
        </li>
        <li>
          玩家[张**份]获得金币
          <span>200</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class WinnerList extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$base: 75;
.winner-list {
  margin: 20rem / $base;
  border: 2px solid #451c0d;
  border-radius: 10rem / $base;
  text-align: center;
  color: #451c0d;
  h3 {
    text-align: center;
    color: #451c0d;
  }
  .winner-container {
    width: 90%;
    margin: auto;
    padding-bottom: 20rem / $base;
    li{
      line-height: 1.5;
      span{
        color:#ff4400;
      }
    }
  }
}
</style>
