<template>
  <div class="number-group flex-container">
    <div>
      <Number :toNumber="ones" />
    </div>
    <div>
      <Number :toNumber="tens" />
    </div>
    <div>
      <Number :toNumber="hundreds" />
    </div>
    <div>
      <Number :toNumber="thousands" />
    </div>
    <div>
      <Number :toNumber="tenThousands" />
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
  ones: number = 0;
  tens: number = 0;
  hundreds: number = 0;
  thousands: number = 0;
  tenThousands: number = 0;

  mounted() {
    setTimeout(() => {
      this.ones = 5;
      this.tens = 9;
      this.hundreds = 0;
      this.thousands = 4;
      this.tenThousands = 1;
    }, 1000);
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
