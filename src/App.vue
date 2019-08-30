<template>
  <div id="app">
    <!--顶部-->
    <div class="flex-container top">
      <div class="flex-1">
        <div v-if="userName">{{userName}}</div>
        <a v-else @click="handleShowModal('login')">登录</a>
      </div>
      <div>
        <a class="top-btn recharge" @click="handleShowModal('recharge')"></a>
      </div>
      <div>
        <a class="top-btn exchange" @click="handleShowModal('exchange')"></a>
      </div>
    </div>
    <!--期数-->
    <div class="flex-container top-info">
      <div class="flex-1">第------期</div>
      <div>金币余额: 8000</div>
    </div>
    <!--抽奖-->
    <div class="lottery">
      <div class="end-time">
        倒计时
        <span>{{endTime}}</span>秒
      </div>
      <NumberGroup />
      <SelectCheck />
      <!--下注记录 按钮-->
      <div class="btn record activeScale" @click="handleShowModal('playRecord')"></div>
      <!--玩法介绍 按钮-->
      <div class="btn desc activeScale" @click="handleShowModal('playIntroduce')"></div>
    </div>

    <!--历史开奖记录-->
    <HistoryRecord />

    <!--获奖名单-->
    <WinnerList />

    <!--弹窗 金币充值-->
    <Recharge v-if="showRecharge" @set-state="handleShowModal" />

    <!--弹窗 玩法介绍-->
    <PlayIntroduce v-if="showPlayIntroduce" @set-state="handleShowModal" />

    <!--弹窗 下注记录-->
    <PlayRecord v-if="showPlayRecord" @set-state="handleShowModal" />

    <!--弹窗 金币兑换-->
    <Exchange v-if="showExchange" @set-state="handleShowModal" />

    <!--弹窗 登录注册-->
    <Login v-if="showLogin" @set-state="handleShowModal" @submit-success="handleSetUserInfo" />

    <!--预加载几张图-->
    <div v-if="isLoaded" class="preloadImg">
      <div class="preloadImg-1"></div>
      <div class="preloadImg-2"></div>
      <div class="preloadImg-3"></div>
      <div class="preloadImg-4"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { setBodyScroll } from "./utils/utils";
import NumberGroup from "./components/NumberGroup.vue";
import SelectCheck from "./components/SelectCheck.vue";
import HistoryRecord from "./components/HistoryRecord.vue";
import WinnerList from "./components/WinnerList.vue";

// 异步加载弹框组件
const PlayIntroduce = () => import("./components/PlayIntroduce.vue");
const PlayRecord = () => import("./components/PlayRecord.vue");
const Exchange = () => import("./components/Exchange.vue");
const Recharge = () => import("./components/Recharge.vue");
const Login = () => import("./components/Login.vue");

@Component({
  components: {
    NumberGroup,
    SelectCheck,
    HistoryRecord,
    WinnerList,
    PlayIntroduce,
    PlayRecord,
    Recharge,
    Exchange,
    Login
  }
})
export default class App extends Vue {
  showRecharge: boolean = false;
  showPlayIntroduce: boolean = false;
  showExchange: boolean = false;
  showLogin: boolean = false;
  showPlayRecord: boolean = false;
  userName: string = "";
  isLoaded: boolean = false;
  endTime: number = 60;

  mounted() {
    this.endTimer(60);
    this.isLoaded = true; // 预加载指定的几张图片
  }

  handleShowModal(type: string) {
    let bodyScrollStatus: boolean = false;
    switch (type) {
      case "recharge":
        this.showRecharge = !this.showRecharge;
        bodyScrollStatus = this.showRecharge;
        break;
      case "exchange":
        this.showExchange = !this.showExchange;
        bodyScrollStatus = this.showExchange;
        break;
      case "playIntroduce":
        this.showPlayIntroduce = !this.showPlayIntroduce;
        bodyScrollStatus = this.showPlayIntroduce;
        break;
      case "playRecord":
        this.showPlayRecord = !this.showPlayRecord;
        bodyScrollStatus = this.showPlayRecord;
        break;
      default:
        this.showLogin = !this.showLogin;
        bodyScrollStatus = this.showLogin;
        break;
    }
    setBodyScroll(this.showRecharge);
  }

  // 设置用户信息
  public handleSetUserInfo(res: any) {}

  // 倒计时
  public endTimer(time: number) {
    let timer: any = null;
    let endTime = time;
    const that = this;
    function timerFn() {
      timer = setInterval(() => {
        endTime--;
        that.endTime = endTime;
        if (endTime === 0) {
          clearInterval(timer);
        }
      }, 1000);
    }
    timerFn();
  }
}
</script>

<style lang="scss">
@import "./assets/style.scss";
</style>
