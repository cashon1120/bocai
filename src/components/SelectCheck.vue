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
          <span :class="hasNumber(item, index) ? 'active activeScale' : 'activeScale'">{{item}}</span>
        </div>
      </div>
    </div>

    <div class="select-type">
      <div v-for="(obj, index) in typeArr" :key="index">
        <span
          v-for="item in obj"
          :class="selectedValue === item.value ? 'active activeScale' : 'activeScale'"
          :data-value="item.value"
          :key="item.value"
          @click="handleSelectType(item.type, item.value)"
        >{{item.title}}</span>
      </div>
    </div>

    <div class="flex-container form-wrapper">
      <div>投注金额: </div>
      <div class="flex-1" style="margin-right: 20px;">
        <input v-model="price" type="number" @keyup="countAll" />
      </div>
      <div>合计: </div>
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
import { Component, Prop, Vue, Watch, Provide } from "vue-property-decorator";
import { showMessage } from "../utils/utils";
import Loading from "./Loading.vue";

@Component({
  components: {
    Loading
  }
})
export default class SelectCheck extends Vue {
  @Prop() private data!: any;
  numberList: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  numberPlace: string[] = ["个位", "十位", "百位", "千位", "万位"];
  typeArr: any[] = [
    [
      { title: "龙", type: "龙虎", value: "龙" },
      { title: "虎", type: "龙虎", value: "虎" },
      { title: "和", type: "和", value: "和" }
    ],
    [
      { title: "总和大", type: "大小", value: "大" },
      { title: "总和小", type: "大小", value: "小" },
      { title: "总和单", type: "单双", value: "单" },
      { title: "总和双", type: "单双", value: "双" }
    ],
    [
      { title: "前豹", type: "豹子", value: "前" },
      { title: "中豹", type: "豹子", value: "中" },
      { title: "后豹", type: "豹子", value: "后" }
    ]
  ];

  nextPeriods: string = "";

  selectedNumbers: any[] = [[], [], [], [], []];
  selectedType: string = "";
  selectedValue: string = "";
  price: string = "";
  total: string = "";

  disabled: boolean = false;

  @Watch("data", { immediate: true, deep: true })
  setAnimation(val: any) {
    this.nextPeriods = val.number_periods;
  }

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
    this.selectedType = "";
    this.selectedValue = "";
    this.countAll();
  }

  // 计算总金额
  public countAll() {
    const { price, selectedType } = this;
    let total = 0;
    if (price) {
      if (selectedType) {
        this.total = price;
      } else {
        this.selectedNumbers.forEach(item => {
          total += item.length * parseInt(price);
        });
        this.total = total.toString();
      }
    }
  }

  // 选择龙虎等事件
  public handleSelectType(type: string, value: string) {
    const { price } = this;
    this.selectedNumbers = [[], [], [], [], []];
    this.selectedType = type;
    this.selectedValue = value;
    this.total = price;
  }

  // 提交
  public handleSubmit() {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      showMessage("请先登录");
      return;
    }
    const {
      price,
      selectedNumbers,
      selectedType,
      selectedValue,
      nextPeriods
    } = this;
    let count = 0;
    selectedNumbers.forEach(item => {
      count = count + item.length;
    });

    if (selectedType === "" && count === 0) {
      showMessage("请选择一个玩法");
      return;
    }
    if (price === "" || typeof price === 'number' && !isNaN(price)) {
      showMessage("请输入正确的投注金额");
      return;
    }

    const type = selectedType ? selectedType : "数字";
    const value = selectedType
      ? selectedValue
      : this.formatNumbers(selectedNumbers);
    this.disabled = true;
    const params = {
      number_periods: nextPeriods,
      userId,
      list: [
        {
          type,
          price,
          value
        }
      ]
    };
    this.$post("/pc/order/bet", {
      jsonString: JSON.stringify(params)
    }).then((res: any) => {
      this.disabled = false;
      if (res.success) {
        showMessage(res.msg);
        this.selectedNumbers = [[], [], [], [], []];
        this.selectedType = "";
        this.total = "";
        this.price = "";
        return;
      }
      showMessage(res.msg);
    });
  }

  private formatNumbers(numbers: any[]) {
    let numStrArray: any[] = [];
    numbers.forEach(item => {
      if (item.length === 0) {
        numStrArray.push("NO");
      } else {
        numStrArray.push(item.join("-"));
      }
    });
    return numStrArray.join(",");
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
    margin-left: 5rem / $base;
    width: 100%;
    border: 1px solid #964910;
    border-radius: 10rem / $base;
    outline: none;
    box-sizing: border-box;
    padding: 12rem / $base 10rem / $base;
  }
}
.btn-container {
  text-align: center;
  padding-bottom: 30rem / $base;
  button {
    background: #4c1203;
    border: 0;
    border-radius: 12rem / $base;
    color: #fff;
    font-size: 28rem / $base;
    padding: 10rem / $base 30rem / $base;
    height: 60rem / $base;
  }
}
</style>
