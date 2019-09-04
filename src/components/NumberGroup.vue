<template>
  <div>
    <!-- <div class="test">{{numbers}}</div> -->
    <div class="number-group flex-container">
      <div v-for="(number, index) in numbers" :key="index">
        <Number :toNumber="number" :autoScroll="isAuto" :index="index" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import Number from "./Number.vue";

@Component({
  components: {
    Number
  }
})
export default class NumberGroup extends Vue {
  @Prop() private data!: any;
  @Prop() private autoScroll!: boolean;

  numbers: number[] = [0, 0, 0, 0, 0];
  isAuto: boolean = false;

  @Watch("data", { immediate: true, deep: true })
  setAnimation(val: any) {
    this.numbers = [
      val.num_one,
      val.num_two,
      val.num_three,
      val.num_four,
      val.num_fives
    ];
  }

  @Watch("autoScroll", { immediate: true, deep: true })
  handleAutoScroll(val: boolean) {
    this.isAuto = val;
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
.test{
  font-size: 30rem / $base;
  text-align: center;
  color: #000;
}
</style>
