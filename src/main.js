import Vue from 'vue'
import App from './App.vue'
import axios from 'axios' 
import store from '@/store/store'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://172.25.219.226:8000'

Vue.prototype.$axios = axios

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
