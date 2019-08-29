<template>
  <div class="winner-list">
    <h3>获奖名单</h3>
    <div class="winner-container">
      <ul ref="animationUl">
        <li v-for="(item, index) in dataList" :key="index">
          玩家 [{{item.name}}] 获得金币
          <span>{{item.money}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class WinnerList extends Vue {
  dataList: any[] = [
    { name: "张三", money: 200 },
    { name: "张三", money: 200 },
    { name: "张三", money: 200 },
    { name: "张三", money: 200 },
    { name: "张三", money: 200 },
    { name: "张三", money: 200 },
    { name: "张三", money: 200 },
    { name: "张三", money: 200 },
    { name: "张三", money: 200 },
    { name: "张三", money: 200 }
  ];
  time: number = 10;
  animationUl: any = null

  mounted(){
    this.animationUl = this.$refs.animationUl
    // this.animationUl.style.animation = `ulAnimation 10s infinite`
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$base: 75;
.winner-list {
  margin: 20rem / $base;
  border: 2px solid #451c0d;
  padding-bottom: 20rem / $base;
  border-radius: 10rem / $base;
  text-align: center;
  color: #451c0d;
  h3 {
    text-align: center;
    color: #451c0d;
  }
  .winner-container {
    overflow: hidden;
    width: 90%;
    margin: auto;
    padding-bottom: 20rem / $base;
    ul {
      animation: ulAnimation 10s linear 0s infinite;
    }
    @keyframes ulAnimation {
      from {
        transform: translate3d(0, 100%, 0);
      }

      to {
        transform: translate3d(0, -100%, 0);
      }
    }
    li {
      line-height: 1.8;
      span {
        color: #ff4400;
        margin-left: 5px;
      }
    }
  }
}
</style>
