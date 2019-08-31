<template>
  <div class="history">
    <ul>
      <li v-for="(item, index) in dataList" :key="item.id">
        <div v-if="index <= 6">
          第{{item.number_periods}}期
          <span>【{{item.num_one}}】【{{item.num_two}}】【{{item.num_three}}】【{{item.num_four}}】【{{item.num_fives}}】</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";

@Component
export default class HistoryRecord extends Vue {
  dataList: any[] = [];
  mounted() {
    this.getData();
  }

  @Emit()
  setData(time: string, data: any){}

  // 请求接口
  private getData() {
    this.$get("/pc/order/get_number_periods", {}).then((res: any) => {
      if (res.success) {
        this.dataList = res.data.filter((item: any) => item.state === 1);
        this.setData(res.data[0], res.data[1])
      }
    });
    setTimeout(() => {
       // this.getData()
    }, 3000);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$base: 75;
.history {
  margin-top: 20rem / $base;
  background: url(../assets/history_record_bg.png) no-repeat;
  background-size: 100% 100%;
  height: 400rem / $base;
  text-align: center;
  box-sizing: border-box;
  padding-top: 90rem / $base;
  ul {
    width: 90%;
    margin: auto;
    font-size: 26rem / $base;
    color: #000;
    li {
      line-height: 1.4;
    }
    span {
      color: #fff;
    }
  }
}
</style>
