<template>
  <div class="number-group flex-container">
    <div v-for="(number, index) in numbers" :key="index">
      <Number :toNumber="number" />
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

  numbers: number[] = [0, 0, 0, 0, 0];

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
