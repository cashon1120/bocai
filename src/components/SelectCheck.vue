<template>
  <div class="check">
    <h3>下注区</h3>
    <div class="flex-group select-number">
      <div>
        <div>
          <span class="title">个位</span>
        </div>
        <div class="number-list" v-for="item in numberList" :key="item">
          <span>{{item}}</span>
        </div>
      </div>

      <div>
        <div>
          <span class="title">十位</span>
        </div>
        <div class="number-list" v-for="item in numberList" :key="item">
          <span>{{item}}</span>
        </div>
      </div>

      <div>
        <div>
          <span class="title">百位</span>
        </div>
        <div class="number-list" v-for="item in numberList" :key="item">
          <span>{{item}}</span>
        </div>
      </div>

      <div>
        <div>
          <span class="title">千位</span>
        </div>
        <div class="number-list" v-for="item in numberList" :key="item">
          <span>{{item}}</span>
        </div>
      </div>

      <div>
        <div>
          <span class="title">万位</span>
        </div>
        <div class="number-list" v-for="item in numberList" :key="item">
          <span>{{item}}</span>
        </div>
      </div>
    </div>

    <div class="select-type">
      <div>
        <span>龙</span>
        <span>虎</span>
        <span>和</span>
      </div>
      <div>
        <span>总和大</span>
        <span>总和小</span>
        <span>总各单</span>
        <span>总各双</span>
      </div>
      <div>
        <span>前豹</span>
        <span>中豹</span>
        <span>后豹</span>
      </div>
    </div>

    <div class="flex-container form-wrapper">
      <div>投注金额:</div>
      <div class="flex-1" style="margin-right: 20px;"><input /></div>
      <div>合计:</div>
      <div class="flex-1"><input /></div>
    </div>
    <div class="btn-container"><button>确认下注</button></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide } from "vue-property-decorator";

@Component
export default class SelectCheck extends Vue {
  @Prop() private msg!: string;
  numberList: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
$base: 75;
h3 {
  padding-top: 20rem / $base !important;
  padding-bottom: 5rem / $base !important;
  color: #000;
  text-align: center;
}
.select-number {
  padding: 0 20rem / $base;
}
.select-number > div > div {
  span {
    display: block;
    text-align: center;
    background: #4c1203;
    width: 50rem / $base;
    height: 50rem / $base;
    line-height: 50rem / $base;
    border-radius: 100%;
    font-size: 24rem/$base;
  }
  span.title {
    border-radius: 10rem / $base;
    width: auto;
    padding: 0 15rem / $base;
    margin-right: 10rem / $base;
  }
}
.number-list {
  flex: 1;
}
.select-type {
  div {
    text-align: center;
    padding-top: 20rem / $base;
  }
  span {
    display: inline-block;
    font-size: 24rem/$base;
    background: #964910;
    height: 50rem / $base;
    padding: 0 20rem / $base;
    line-height: 50rem / $base;
    border-radius: 10rem / $base;
    color: #fff;
    margin: 0 10rem / $base;
  }
}
.form-wrapper{
  padding: 30rem / $base !important;
  margin-top: 20rem / $base;
  font-weight: bold;
  -webkit-text-stroke: 1px rgba(150,73,16,.6);
  input {
    width: 100%;
    border: 1px solid #964910;
    border-radius: 10rem / $base;
    outline: none;
    height: 50rem / $base;
    line-height: 50rem / $base;
    box-sizing: border-box;
    padding: 0 10rem / $base;
  }
 
}
.btn-container{
  text-align: center;
  padding-bottom: 30rem/$base;
 button{
    background: #4c1203;
    border: 0;
    border-radius: 10rem / $base;
    color: #fff;
    padding: 10rem / $base 30rem/$base;
    height: 60rem / $base;
  }
}
</style>
