<template>
  <div class="winner-list">
    <h3>获奖名单</h3>
    <div class="winner-container">
      <ul ref="animationUl">
        <li>
          玩家[张**份]获得金币
          <span>970.6</span>
        </li>
        <li>
          玩家[All**ss]获得金币
          <span>168.5</span>
        </li>
        <li>
          玩家[没有**印记]获得金币
          <span>200</span>
        </li>
        <li>
          玩家[拼图**一角]获得金币
          <span>402.7</span>
        </li>
        <li>
          玩家[半杯**咖啡]获得金币
          <span>3955</span>
        </li>
        <li>
          玩家[名动**一方]获得金币
          <span>680.9</span>
        </li>
        <li>
          玩家[无休**无止]获得金币
          <span>180.77</span>
        </li>
        <li>
          玩家[、-解**开心结]获得金币
          <span>600</span>
        </li>
        <li>
          玩家[我关心**的人╮]获得金币
          <span>5000</span>
        </li>
        <li>
          玩家[1238**899]获得金币
          <span>33.7</span>
        </li>
        <li>
          玩家[＿红颜**格子控]获得金币
          <span>952.88</span>
        </li>
        <li>
          玩家[美到**醒#]获得金币
          <span>33.12</span>
        </li>
        <li>
          玩家[我の**在向″]获得金币
          <span>12.66</span>
        </li>
        <li>
          玩家[勾**嘴笑]获得金币
          <span>9182.99</span>
        </li>
        <li>
          玩家[の女**神ゝ]获得金币
          <span>127.66</span>
        </li>
        <li>
          玩家[yo**ke]获得金币
          <span>66.88</span>
        </li>
        <li>
          玩家[bu**ry.]获得金币
          <span>42.18</span>
        </li>
        <li>
          玩家[ali**sa]获得金币
          <span>81.52</span>
        </li>
        <li>
          玩家[旧**事]获得金币
          <span>391.12</span>
        </li>
        <li>
          玩家[呼**吸]获得金币
          <span>932.12</span>
        </li>
        <li>
          玩家[garb**age]获得金币
          <span>293.5</span>
        </li>
        <li>
          玩家[挽**歌]获得金币
          <span>888.99</span>
        </li>
        <li>
          玩家[ho**bo]获得金币
          <span>912.54</span>
        </li>
        <li>
          玩家[伤**绪]获得金币
          <span>200</span>
        </li>
        <li>
          玩家[Dr**m]获得金币
          <span>98</span>
        </li>
        <li>
          玩家[尾*戒]获得金币
          <span>1200</span>
        </li>
        <li>
          玩家[at**est ]获得金币
          <span>80</span>
        </li>
        <li>
          玩家[优* ]获得金币
          <span>420</span>
        </li>
        <li>
          玩家[燃**]获得金币
          <span>59</span>
        </li>
        <li>
          玩家[s**den]获得金币
          <span>125</span>
        </li>
        <li>
          玩家[L**as]获得金币
          <span>32</span>
        </li>
        <li>
          玩家[红**wom、]获得金币
          <span>112</span>
        </li>
        <li>
          玩家[R**ms]获得金币
          <span>22</span>
        </li>
        <li>
          玩家[se***不离]获得金币
          <span>42</span>
        </li>
        <li>
          玩家[台客**o]获得金币
          <span>91</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Winner extends Vue {}
</script>
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
    height: 400rem / $base;
    width: 90%;
    margin: auto;
    padding-bottom: 20rem / $base;
    ul {
      animation: ulAnimation 35s linear 0s infinite;
    }
    @keyframes ulAnimation {
      from {
        transform: translate3d(0, 27%, 0);
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
