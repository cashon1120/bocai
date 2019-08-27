import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios';
import App from './App.vue'
import './utils/auto-size.js'

axios.defaults.baseURL = '/api'; // 这是调用数据接口

Vue.use(VueAxios, axios);
new Vue({
  render: h => h(App),
}).$mount('#app')
