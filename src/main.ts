import Vue from 'vue'
import App from './App.vue'
import './utils/auto-size.js'
import './utils/axios.tool';

Vue.prototype.$configList = []

const windowHeight = window.innerHeight
Vue.directive('fixedInput', function (el, binding) {
  el.addEventListener('blur', function () {
    let windowFocusHeight = window.innerHeight
    if (windowHeight == windowFocusHeight) {
      return
    }
    let currentPosition;
    let speed = 1; //页面滚动距离
    currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
    currentPosition -= speed;
    window.scrollTo(0, currentPosition); //页面向上滚动
    currentPosition += speed; //speed变量
    window.scrollTo(0, currentPosition); //页面向下滚动
  })
})

new Vue({
  render: h => h(App),
}).$mount('#app')
