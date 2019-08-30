<template>
  <div class="modal">
    <div class="modalContent introduce">
      <h3>下注记录</h3>
      <a class="close activeScale" @click="setState('playRecord')"></a>
      <div class="content">
        <div v-if="dataList.length > 0">
          <ul>
            <li v-for="item in dataList" :key="item.id"></li>
          </ul>
        </div>
        <div class="nodata" v-else>暂无记录</div>
      </div>
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
    this.$get("/pc/order/user_log", {})
      .then((res: any) => {
        if (res.success) {
          this.dataList = res.data;
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
.introduce {
  background: url(../assets/play_introduce_bg.png) no-repeat;
  background-size: 100% 100%;
  height: 810rem / $base;
  width: 100%;
  box-sizing: border-box;
  padding: 40rem / $base 55rem / $base 30rem / $base 55rem / $base;
  h3 {
    color: #d87f29;
    font-size: 30rem / $base;
  }
  .content {
    text-align: left;
    height: 600rem / $base;
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
