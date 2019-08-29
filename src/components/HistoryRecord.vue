<template>
  <div class="history">
    <ul>
      <li v-for="item in dataList" :key="item.id">
        第{{item.id}}期
        <span>【{{item.number1}}】【{{item.number2}}】【{{item.number3}}】【{{item.number4}}】【{{item.number5}}】</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HistoryRecord extends Vue {
  dataList: any[] = [
    {
      id: 2340923094823098,
      number1: 1,
      number2: 2,
      number3: 3,
      number4: 4,
      number5: 5
    }
  ];
  mounted() {
    this.getData();
  }

  // 请求接口
  private getData() {
    this.$get("/url", {}).then((res: any) => {
      if (res.code === 1) {
        return;
      }
    });
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
  padding-top: 100rem / $base;
  ul {
    width: 90%;
    margin: auto;
    font-size: 26rem / $base;
    color: #000;
    font-weight: bold;
    li {
      line-height: 1.6;
    }
    span {
      color: #fff;
      margin-left: 10rem / $base;
    }
  }
}
</style>
