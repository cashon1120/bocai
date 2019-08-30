<template>
  <div id="app">
    <!--顶部-->
    <div class="flex-container top">
      <div class="flex-1">
        <div v-if="userName">
          {{userName}}
          <a @click="handleLogout">[退出]</a>
        </div>
        <a v-else @click="handleTriggerModal('login')">登录</a>
      </div>
      <div>
        <a class="top-btn recharge" @click="handleTriggerModal('recharge')"></a>
      </div>
      <div>
        <a class="top-btn exchange" @click="handleTriggerModal('exchange')"></a>
      </div>
    </div>
    <!--期数-->
    <div class="flex-container top-info">
      <div class="flex-1">第{{currentPeriods.number_periods}}期</div>
      <div>
        <a @click="getUserInfo">刷新金币</a>
        金币余额: {{userMoney}}
      </div>
    </div>
    <!--抽奖-->
    <div class="lottery">
      <div class="end-time">
        倒计时
        <span>{{endTime}}</span>秒
      </div>
      <NumberGroup :data="currentPeriods" />
      <SelectCheck />
      <!--下注记录 按钮-->
      <div class="btn record activeScale" @click="handleTriggerModal('playRecord')"></div>
      <!--玩法介绍 按钮-->
      <div class="btn desc activeScale" @click="handleTriggerModal('playIntroduce')"></div>
    </div>

    <!--历史开奖记录-->
    <HistoryRecord @set-data="handleSetNumberPeriods" />

    <!--获奖名单-->
    <WinnerList />

    <!--弹窗 金币充值-->
    <Recharge v-if="showRecharge" :configList="configList" @set-state="handleTriggerModal" />

    <!--弹窗 玩法介绍-->
    <PlayIntroduce v-if="showPlayIntroduce" @set-state="handleTriggerModal" />

    <!--弹窗 下注记录-->
    <PlayRecord v-if="showPlayRecord" @set-state="handleTriggerModal" />

    <!--弹窗 金币兑换-->
    <Exchange v-if="showExchange" @set-state="handleTriggerModal" />

    <!--弹窗 登录注册-->
    <Login v-if="showLogin" @set-state="handleTriggerModal" @submit-success="handleSetUserInfo" />

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
import { setBodyScroll, showMessage } from "./utils/utils";
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
  userId: number = 0;
  userMoney: number = 0;

  currentPeriods: any = {};

  isLoaded: boolean = false;
  configList: any[] = [];
  endTime: number | string = '---';

  mounted() {
    this.getConfig();
    this.isLoaded = true; // 预加载指定的几张图片
    // 获取本地用户信息
    const userName = localStorage.getItem("userName");
    const userId = localStorage.getItem("userId");
    if (userId && userName) {
      this.userName = userName;
      this.userId = parseInt(userId);
    }
    this.getUserInfo();
  }

  // 显示/影藏弹框
  handleTriggerModal(type: string) {
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
  public handleSetUserInfo(res: any) {
    this.userName = res.account;
    localStorage.setItem("userName", res.account);
    localStorage.setItem("userId", res.id);
    this.handleTriggerModal("login");
  }

  // 倒计时
  private endTimer(time: string) {
    const now = new Date()
    const endTime = new Date(time)
    let timer: any = null;
    let leftTimes = now.getTime() -endTime.getTime();
    let seconds = 300 - parseInt(`${leftTimes / 1000 % 60}`, 10)
    const that = this;
    function timerFn() {
      timer = setInterval(() => {
        seconds--;
        that.endTime = seconds;
        if (seconds === 0) {
          clearInterval(timer);
          showMessage('开奖中, 停止下注')
        }
      }, 1000);
    }
    timerFn();
  }

  // 退出
  public handleLogout() {
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    this.userName = "";
  }
  // 获取充值配置
  public getConfig() {
    this.$get("/pc/pay/money_config").then((res: any) => {
      if (res.success) {
        this.configList = res.data;
      }
    });
  }

  // 获取用户信息
  private getUserInfo() {
    const { userId } = this;
    if (userId) {
      this.$get("/pc/user/get_info?userId=" + userId).then((res: any) => {
        if (res.success) {
          this.userMoney = res.data;
        }
      });
    }
  }

  public handleSetNumberPeriods(time: string, data: any) {
    if (this.currentPeriods.number_periods !== data.number_periods) {
      this.currentPeriods = data;
      this.endTimer(time);
    }
  }
}
</script>

<style lang="scss">
@import "./assets/style.scss";
</style>
