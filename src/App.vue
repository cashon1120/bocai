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
        <a v-if="userId" @click="getUserInfo">{{isGetInfo ? '更新中...' : '更新金币'}}</a>
        金币余额: {{userInfo.money}}
      </div>
    </div>
    <!--抽奖-->
    <div class="lottery">
      <div class="end-time">
        倒计时
        <span>{{endTime}}</span>秒
      </div>
      <NumberGroup :data="currentPeriods" :autoScroll="autoScroll" />
      <SelectCheck :data="nextPeriods" />
      <!--下注记录 按钮-->
      <div class="btn record activeScale" @click="handleTriggerModal('playRecord')"></div>
      <!--玩法介绍 按钮-->
      <div class="btn desc activeScale" @click="handleTriggerModal('playIntroduce')"></div>
    </div>

    <!--历史开奖记录-->
    <HistoryRecord @set-data="handleSetNumberPeriods" />

    <!--获奖名单-->
    <Winner />

    <!--弹窗 金币充值-->
    <Recharge v-if="showRecharge" :configList="configList" @set-state="handleTriggerModal" />

    <!--弹窗 玩法介绍-->
    <PlayIntroduce v-if="showPlayIntroduce" @set-state="handleTriggerModal" />

    <!--弹窗 下注记录-->
    <PlayRecord v-if="showPlayRecord" @set-state="handleTriggerModal" />

    <!--弹窗 金币兑换-->
    <Exchange
      v-if="showExchange"
      :userInfo="userInfo"
      @set-state="handleTriggerModal"
      @submit-success="handleSetUserInfo"
    />

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
import Winner from "./components/Winner.vue";

import PlayIntroduce from "./components/PlayIntroduce.vue";
import PlayRecord from "./components/PlayRecord.vue";
import Exchange from "./components/Exchange.vue";
import Recharge from "./components/Recharge.vue";
import Login from "./components/Login.vue";

// 异步加载弹框组件
// const PlayIntroduce = () => import("./components/PlayIntroduce.vue");
// const PlayRecord = () => import("./components/PlayRecord.vue");
// const Exchange = () => import("./components/Exchange.vue");
// const Recharge = () => import("./components/Recharge.vue");
// const Login = () => import("./components/Login.vue");

@Component({
  components: {
    NumberGroup,
    SelectCheck,
    HistoryRecord,
    PlayIntroduce,
    PlayRecord,
    Recharge,
    Exchange,
    Login,
    Winner
  }
})
export default class App extends Vue {
  showRecharge: boolean = false;
  showPlayIntroduce: boolean = false;
  showExchange: boolean = false;
  showLogin: boolean = false;
  showPlayRecord: boolean = false;
  isGetInfo: boolean = false;
  autoScroll: boolean = false;

  userName: string = "";
  userId: number = 0;

  userInfo = {};

  currentPeriods: any = {};
  nextPeriods: any = {};

  isLoaded: boolean = false;
  configList: any[] = [];
  endTime: number | string = "---";
  endTimer: any = null;

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
        if (!this.userId) {
          showMessage("请先登录");
          return;
        }
        this.showRecharge = !this.showRecharge;
        bodyScrollStatus = this.showRecharge;
        break;
      case "exchange":
        if (!this.userId) {
          showMessage("请先登录");
          return;
        }
        this.showExchange = !this.showExchange;
        bodyScrollStatus = this.showExchange;
        break;
      case "playIntroduce":
        this.showPlayIntroduce = !this.showPlayIntroduce;
        bodyScrollStatus = this.showPlayIntroduce;
        break;
      case "playRecord":
        if (!this.userId) {
          showMessage("请先登录");
          return;
        }
        this.showPlayRecord = !this.showPlayRecord;
        bodyScrollStatus = this.showPlayRecord;
        break;
      default:
        this.showLogin = !this.showLogin;
        bodyScrollStatus = this.showLogin;
        break;
    }
    setBodyScroll(bodyScrollStatus);
  }

  // 设置用户信息
  public handleSetUserInfo(res?: any) {
    // 登录成功调用
    if (res) {
      this.userName = res.account;
      this.userId = res.id;
      localStorage.setItem("userName", res.account);
      localStorage.setItem("userId", res.id);
      this.handleTriggerModal("login");
    } else {
      this.handleTriggerModal("exchange");
    }

    // 兑换成功调用

    this.getUserInfo();
  }

  // 倒计时
  private setEndTime(time: string) {
    clearInterval(this.endTimer);
    
    this.autoScroll = false;
    const endTime = new Date(time.replace(/-/g, "/"));
    const ADD_MINUTES = 5 // 开奖周期, 正常情况下5分钟一期, 在发布时间上加上该分钟数
    const now = new Date();
    endTime.setMinutes(endTime.getMinutes() + ADD_MINUTES);

    let leftTimes = endTime.getTime() - now.getTime();
    let seconds = parseInt(`${leftTimes / 1000}`, 10);
    // 首次进入时间小于10秒直接提示
    if (seconds <= 10) {
      this.autoScroll = true;
      showMessage("开奖中, 停止下注");
      return;
    }
    const that = this;
    function timerFn() {
      that.endTimer = setInterval(() => {
        seconds--;
        that.endTime = seconds;
        if (seconds <= 10) {
          that.autoScroll = true;
          showMessage("开奖中, 停止下注");
        }
        if (seconds <= 0) {
          that.endTime = 0;
          clearInterval(that.endTimer);
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
    this.userId = 0;
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
  public getUserInfo() {
    const { userId } = this;
    this.isGetInfo = true;
    if (userId) {
      this.$get("/pc/user/get_info?userId=" + userId)
        .then((res: any) => {
          if (res.success) {
            this.userInfo = res.data;
          }
          this.isGetInfo = false;
        })
        .catch(() => {
          this.isGetInfo = false;
        });
    }
  }

  public handleSetNumberPeriods(next: any, data: any) {
    if (this.currentPeriods.number_periods !== data.number_periods) {
      this.autoScroll = false;
      this.currentPeriods = data;
    }

    // 获取下一期信息(发布时间, 开奖期数)
    if (this.nextPeriods.number_periods !== next.number_periods) {
      this.nextPeriods = next;
      this.setEndTime(next.publish_time);
    }
  }
}
</script>

<style lang="scss">
@import "./assets/style.scss";
</style>
