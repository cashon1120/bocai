import Vue from 'vue'
import App from './App.vue'
import './utils/auto-size.js'
import './utils/axios.tool';

Vue.prototype.$configList = []

new Vue({
  render: h => h(App),
}).$mount('#app')
