<template>
  <div class="check">
    <h3>下注区</h3>
    <div class="flex-group select-number">
      <div v-for="(ele, index) in numberPlace" :key="index">
        <div>
          <span class="title">{{ele}}</span>
        </div>
        <div
          class="number-list"
          v-for="item in numberList"
          :key="item"
          @click="pushNumber(item, index)"
        >
          <span :class="hasNumber(item, index) ? 'active' : null">{{item}}</span>
        </div>
      </div>
    </div>

    <div class="select-type">
      <div v-for="(obj, index) in typeArr" :key="index">
        <span
          v-for="item in obj"
          :class="selectedType === item.value ? 'active' : null"
          :data-value="item.value"
          :key="item.value"
          @click="handleSelectType(item.value)"
        >{{item.title}}</span>
      </div>
    </div>

    <div class="flex-container form-wrapper">
      <div>投注金额:</div>
      <div class="flex-1" style="margin-right: 20px;">
        <input v-model="money" @keyup="countAll" />
      </div>
      <div>合计:</div>
      <div class="flex-1">
        <input v-model="total" disabled />
      </div>
    </div>
    <div class="btn-container">
      <button class="activeScale" :disabled="disabled" @click="handleSubmit">确认下注</button>
    </div>
    <Loading v-show="disabled" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide } from "vue-property-decorator";
import { showMessage } from "../utils/utils";
import Loading from "./Loading.vue";

@Component
export default class SelectCheck extends Vue {
  @Prop() private msg!: string;
  numberList: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  numberPlace: string[] = ["个位", "十位", "百位", "千位", "万位"];
  typeArr: any[] = [
    [
      { title: "龙", value: 1 },
      { title: "虎", value: 2 },
      { title: "和", value: 3 }
    ],
    [
      { title: "总和大", value: 4 },
      { title: "总和小", value: 5 },
      { title: "总和单", value: 6 },
      { title: "总和双", value: 7 }
    ],
    [
      { title: "前豹", value: 8 },
      { title: "中豹", value: 9 },
      { title: "后豹", value: 10 }
    ]
  ];
  selectedNumbers: any[] = [[], [], [], [], []];
  selectedType: number = 0;
  money: string = "";
  total: string = "";
  disabled: boolean = false

  // 判断是否已经包含该数字
  public hasNumber(number: number, index: number) {
    return this.selectedNumbers[index].includes(number);
  }

  // 点击数字事件
  public pushNumber(number: number, index: number) {
    if (!this.hasNumber(number, index)) {
      this.selectedNumbers[index].push(number);
    } else {
      const numberIndex = this.selectedNumbers[index].indexOf(number); // 获取包含数字索引
      this.selectedNumbers[index].splice(numberIndex, 1);
    }
    this.selectedType = 0;
    this.countAll();
  }

  // 计算总金额
  public countAll() {
    const { money } = this;
    let total = 0;
    if (money) {
      this.selectedNumbers.forEach(item => {
        total += item.length * parseInt(money);
      });
      this.total = total.toString();
    }
  }

  // 选择龙虎等事件
  public handleSelectType(data: number) {
    const { money } = this;
    this.selectedNumbers = [[], [], [], [], []];
    this.selectedType = data;
    this.total = money;
  }

  // 提交
  public handleSubmit() {
    const { money, selectedNumbers, selectedType } = this;
    let count = 0;
    selectedNumbers.forEach(item => {
      count += item.length;
    });
    if (selectedType === 0 || count === 0) {
      showMessage("请选择一个玩法");
      return;
    }
    if (money === "") {
      showMessage("请输入投注金额");
      return;
    }
    this.disabled = true;
    this.$post("/url", {
      money,
      selectedType
    }).then((res: any) => {
      this.disabled = false;
      if (res.code === 1) {
        showMessage("成功");
        return;
      }
      showMessage("失败");
    });
  }
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
    line-height: 52rem / $base;
    border-radius: 100%;
    font-size: 24rem / $base;
  }
  span.active {
    background: #a4cb0b;
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
  text-align: center;
  div {
    text-align: center;
    padding-top: 20rem / $base;
  }
  span {
    display: inline-block;
    font-size: 24rem / $base;
    background: #964910;
    height: 50rem / $base;
    padding: 0 20rem / $base;
    line-height: 50rem / $base;
    border-radius: 10rem / $base;
    color: #fff;
    margin: 0 10rem / $base;
  }
  span.active {
    background: #a4cb0b;
  }
  span:nth(2) {
    clear: right;
  }
}
.form-wrapper {
  padding: 30rem / $base !important;
  margin-top: 20rem / $base;
  font-weight: bold;
  -webkit-text-stroke: 1px rgba(150, 73, 16, 0.6);
  input {
    width: 100%;
    border: 1px solid #964910;
    border-radius: 10rem / $base;
    outline: none;
    height: 50rem / $base;
    line-height: 52rem / $base;
    box-sizing: border-box;
    padding: 0 10rem / $base;
  }
}
.btn-container {
  text-align: center;
  padding-bottom: 30rem / $base;
  button {
    background: #4c1203;
    border: 0;
    border-radius: 10rem / $base;
    color: #fff;
    padding: 10rem / $base 30rem / $base;
    height: 60rem / $base;
  }
}
</style>
