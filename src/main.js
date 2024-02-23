import Vue from 'vue'
import App from './App.vue'
import axios from 'axios' 

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://172.25.219.226:8000'

Vue.prototype.$axios = axios

new Vue({
  render: h => h(App),
}).$mount('#app')
