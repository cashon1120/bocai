<template>
  <div class="modal">
    <div class="modalContent introduce">
      <h3>游戏玩法介绍</h3>
      <a class="close activeScale" @click="setState('playIntroduce')"></a>
      <div class="content">
        <dl>
          <dt>一、赔率介绍</dt>
          <dd>单个号球赔率9倍，总和大小、单双、龙虎赔率1.95倍，“和”赔率</dd>
        </dl>
        <dl>
          <dt>二、规则介绍</dt>
          <dd>1.游戏每5分钟开奖一次，号球顺序为“个位”、“十位”、“百位”、“千位”、“万位”您所购买的号球对应位置与开奖号球一致，则获得相应赔率奖励。</dd>
          <dd>2.什么是龙虎？开奖号球万位数大于个位数为龙，反之为虎。例如开奖为74152这局为龙。</dd>
          <dd>3.什么是总和单双？开奖所有号球相加得偶数为双，得奇数为单。例如开奖为25486，相加得25此局为单。</dd>
          <dd>5.什么是“和”开奖号球万位数和个位数一样为和。例如开奖为16581，此局为和。</dd>
          <dd>6.什么是豹子？开奖号球相邻的3个数一样为豹子，豹子分为前豹、后豹、中豹。例如77701为前豹、17772为中豹、32777为后豹。</dd>
        </dl>
        <dl>
          <dt>三、下注介绍</dt>
          <dd>在下注区选择您要下注的玩法后，在下方投注金额处输入投注金额，点击确认下注后完成下注。如果一次性下注多个玩法，则投注金额处输入的投注金额为每个玩法的投注金额（注意不是所有你要下注玩法的总金额）旁边“合计”显示的才是当前投注的总金额。下注后可在“查看购买记录”中查看您当前的下注情况、中将情况、历史记录等。</dd>
        </dl>
        <dl>
          <dt>四、金币兑换</dt>
          <dd>中奖后可将金币兑换为战火公益内的钻石，兑换时请填写战火公益的游戏账号及兑换金额，并认证核对。兑换后请在游戏内的“钻石充值”NPC处领取，金币兑换比例与战火公益游戏充值比例一致，若因玩家填写错误导致兑换失败，概不负责！</dd>
        </dl>
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
  height: 780rem / $base;
  width: 100%;
  box-sizing: border-box;
  padding: 40rem / $base 55rem / $base 30rem / $base 55rem / $base;
  h3 {
    color: #d87f29;
    font-size: 30rem / $base;
  }
  .content {
    text-align: left;
    height: 550rem / $base;
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
