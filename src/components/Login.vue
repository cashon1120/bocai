<template>
  <div class="modal login" v-show="show">
    <div :class="!showLogin ? 'isReg' : null">
      <a class="close activeScale" @click="triggerShow"></a>
      <div class="form-container">
        <div class="form-type flex-container">
          <div class="flex-1" @click="handleChangeType(true)">
            <span :class="showLogin ? 'active' : null">登录</span>
          </div>
          <div class="flex-1" @click="handleChangeType(false)">
            <span :class="!showLogin ? 'active' : null">注册</span>
          </div>
        </div>
        <div v-if="showLogin">
          <input placeholder="账号" />
          <input placeholder="登录密码" />
        </div>
        <div v-else>
          <input placeholder="账号" />
          <input placeholder="登录密码" />
          <input placeholder="银行卡号" />
          <input placeholder="真实姓名" />
        </div>
      </div>
      <button>{{showLogin ? '登录' : '注册'}}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { setBodyScroll } from "../utils/utils";

@Component
export default class PlayIntroduce extends Vue {
  @Prop() show!: boolean;
  showLogin: boolean = true

  public triggerShow() {
    this.$emit("setState");
  }

  public handleChangeType(tag: boolean){
    this.showLogin = tag
  }
}
</script>

<style lang="scss">
$base: 75;
.login {
  .isReg{
    background:url(../assets/modal_bg_reg.png) no-repeat center center !important;
    background-size: 100% 100% !important;
    min-height: 780rem / $base !important;
  }
  .form-type {
    margin-bottom: 20rem / $base;
    padding: 1px;
    background: #501414;
    border-radius: 10rem / $base;
    color: #fff;
    span {
      display: block;
      padding: 10rem / $base;
      border-radius: 8rem / $base;
      &.active {
        background: #d87f29;
      }
    }
  }
  .form-container {
    input {
      margin-top: 45rem / $base !important;
    }
  }
}
</style>
