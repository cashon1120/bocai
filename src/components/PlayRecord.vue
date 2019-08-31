<template>
  <div class="modal">
    <div class="modalContent playRecord">
      <h3>下注记录</h3>
      <a class="close activeScale" @click="setState('playRecord')"></a>
      <div class="top"></div>
      <div class="content">
        <div v-if="dataList.length > 0">
          <ul>
            <li class="flex-group" v-for="item in dataList" :key="item.id">
              <div class="title">
                <div class="flex-1">第{{item.number_periods}}期</div>
                <div>
                  <span :class="item.zj === '未中奖' || item.zj === '未开奖' ? null : 'active'">{{item.zj}}</span>
                </div>
              </div>
              <div>
                <div>玩法:</div>
                <div class="flex-1">{{item.describe}}</div>
              </div>
              <div>
                <div>内容:</div>
                <div class="flex-1">
                  <div v-if="item.describe === '数字投注'">
                    <span v-for="(obj, index) in item.formatVaule" :key="index">
                      <i v-if="obj.length>4">{{obj}}</i>
                    </span>
                  </div>
                  <span v-else>{{item.value}}</span>
                </div>
              </div>
              <div>
                <div>金额:</div>
                <div class="flex-1">{{item.money}}</div>
              </div>
              <div>
                <div>时间:</div>
                <div class="flex-1">{{item.publish_time}}</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="nodata" v-else>暂无记录</div>
      </div>
      <div class="bottom"></div>
    </div>
    <Loading v-show="loading" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import Loading from "./Loading.vue";
import { setBodyScroll } from "../utils/utils";

@Component({
  components: {
    Loading
  }
})
export default class PlayIntroduce extends Vue {
  dataList: any[] = [];
  loading: boolean = false;

  @Emit()
  setState() {}

  public mounted() {
    this.getData();
  }

  public getData() {
    this.loading = true;
    const userId = localStorage.getItem("userId");
    this.$get("/pc/order/user_log?userId=" + userId)
      .then((res: any) => {
        if (res.success) {
          const data = res.data;

          for (let i = 0; i < data.length; i += 1) {
            if (data[i].describe === "数字投注") {
              const tempArr: any[] = [];
              const arr = data[i].value.split(",");
              tempArr[0] = `个位: ${arr[0]}`;
              tempArr[1] = `十位: ${arr[1]}`;
              tempArr[2] = `百位: ${arr[2]}`;
              tempArr[3] = `千位: ${arr[3]}`;
              tempArr[4] = `万位: ${arr[4]}`;
              data[i].formatVaule = tempArr;
            }
          }
          this.dataList = data;
        }
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  }
}
</script>

<style lang="scss">
$base: 75;
.playRecord {
  background: none !important;
  width: 100%;
  .close {
    top: 70rem / $base;
  }
  .top {
    background: url(../assets/bg_top.png) no-repeat;
    background-size: 100% 100%;
    height: 110rem / $base;
  }
  .bottom {
    background: url(../assets/bg_bottom.png) no-repeat;
    background-size: 100% 100%;
    height: 110rem / $base;
  }
  box-sizing: border-box;
  padding-top: 0;
  h3 {
    position: absolute;
    width: 100%;
    top: 110rem / $base;
    color: #d87f29;
    font-size: 30rem / $base;
  }
  .content {
    text-align: left;
    background: url(../assets/modal_bg_1.png);
    background-size: 100% auto;
    height: 900rem / $base;
    overflow: auto;
    font-size: 24rem / $base;
    & > div {
      padding: 0;
    }
    ul {
      width: 80%;
      margin: auto;
      li {
        margin-top: 20rem / $base;
        font-size: 24rem / $base;
        background: #311313;
        border: 1px solid #461818;
        span.active{
          color: #f00;
        }
        i{
          font-style: normal;
          display: inline-block;
          margin-right: 20rem / $base;
        }
        .title {
          font-weight: bold;
          border-bottom: 1px solid #461818;
          padding: 10rem / $base 15rem / $base;
        }
        & > div {
          padding: 7rem / $base 15rem / $base;
          align-items: flex-start;
          & > div:last-child {
            padding-left: 15rem / $base;
          }
        }
      }
    }
  }
}
</style>
