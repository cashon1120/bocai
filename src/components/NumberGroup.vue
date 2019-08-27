<template>
  <div class="number-group flex-container">
    <div>
      <Number />
    </div>
    <div>
      <Number />
    </div>
    <div>
      <Number />
    </div>
    <div>
      <Number />
    </div>
    <div>
      <Number />
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
  @Prop() private msg!: string;
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
