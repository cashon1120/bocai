<template>
  <div class="number-group flex-container">
    <div v-for="(number, index) in numbers" :key="index">
      <Number :toNumber="number" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Number from "./Number.vue";

@Component({
  components: {
    Number
  }
})
export default class NumberGroup extends Vue {
  numbers: number[] = [0, 0, 0, 0, 0];

  mounted() {
    this.getData();
  }

  // 设置数字
  private setNumbers(num: number) {
    const number = num.toString().padStart(5, "0");
    const temp = [0, 0, 0, 0, 0];
    number.split("").forEach((key: string, index: number) => {
      temp[index] = parseInt(key);
    });
    this.numbers = temp;
  }

  // 请求接口
  private getData() {
    this.$get("/url", {}).then((res: any) => {
      if (res.code === 1) {
        this.setNumbers(res.number);
        return;
      }
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
$base: 75;
.number-group > div {
  flex: 1;
  text-align: center;
}
</style>
