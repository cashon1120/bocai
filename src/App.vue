<template>
  <div id="app">
    <!--顶部-->
    <div class="flex-container top">
      <div class="flex-1">
        <a @click="handleShowLogin">登录</a>
      </div>
      <div>
        <a class="top-btn recharge" @click="handleShowRecharge"></a>
      </div>
      <div>
        <a class="top-btn exchange" @click="handleShowExchange"></a>
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
        <span>60</span>秒
      </div>
      <NumberGroup />
      <SelectCheck />
      <!--下注记录 按钮-->
      <div class="btn record activeScale" @click="handleShowPLayIntroduce"></div>
      <!--玩法介绍 按钮-->
      <div class="btn desc activeScale" @click="handleShowPLayIntroduce"></div>
    </div>

    <!--历史开奖记录-->
    <HistoryRecord />

    <!--获奖名单-->
    <WinnerList />

    <!--弹窗 金币充值-->
    <Recharge :show="showRecharge" @setState="handleShowRecharge" @showError="showErrorMsg" />

    <!--弹窗 玩法介绍-->
    <PlayIntroduce
      :show="showPlayIntroduce"
      @setState="handleShowPLayIntroduce"
      @showError="showErrorMsg"
    />

    <!--弹窗 金币兑换-->
    <Exchange :show="showExchange" @setState="handleShowExchange" @showError="showErrorMsg" />

    <!--弹窗 登录注册-->
    <Login :show="showLogin" @setState="handleShowLogin" @showError="showErrorMsg" />

    <!--错误信息提示-->
    <MessageTip :msg="errorMsg" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { setBodyScroll } from "./utils/utils";
import NumberGroup from "./components/NumberGroup.vue";
import SelectCheck from "./components/SelectCheck.vue";
import HistoryRecord from "./components/HistoryRecord.vue";
import WinnerList from "./components/WinnerList.vue";
import PlayIntroduce from "./components/PlayIntroduce.vue";
import Recharge from "./components/Recharge.vue";
import Exchange from "./components/Exchange.vue";
import Login from "./components/Login.vue";
import MessageTip from "./components/MessageTip.vue";

@Component({
  components: {
    NumberGroup,
    SelectCheck,
    HistoryRecord,
    WinnerList,
    PlayIntroduce,
    Recharge,
    Exchange,
    Login,
    MessageTip
  }
})
export default class App extends Vue {
  showRecharge: boolean = false;
  showPlayIntroduce: boolean = false;
  showExchange: boolean = false;
  showLogin: boolean = false;
  errorMsg: string = "";
  errorTimer: any = null

  public handleShowRecharge() {
    this.showRecharge = !this.showRecharge;
    setBodyScroll(this.showRecharge);
  }

  public handleShowPLayIntroduce() {
    this.showPlayIntroduce = !this.showPlayIntroduce;
    setBodyScroll(this.showPlayIntroduce);
  }

  public handleShowExchange() {
    this.showExchange = !this.showExchange;
    setBodyScroll(this.showExchange);
  }

  public handleShowLogin() {
    this.showLogin = !this.showLogin;
    setBodyScroll(this.showLogin);
  }

  public showErrorMsg(msg: string) {
    this.errorMsg = msg
    clearInterval(this.errorTimer)
    this.errorTimer = setTimeout(() => {
      this.errorMsg = ''
    }, 2000);
  }
}
</script>

<style lang="scss">
@import "./assets/style.scss";
</style>
