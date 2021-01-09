import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import '@/assets/styles/app.css'

require('@/store/subscriber.js')

axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.params = {}
axios.defaults.params['username'] = process.env.VUE_APP_API_USERNAME

Vue.config.productionTip = false

console.log(localStorage.getItem('token'))
store.dispatch('auth/attempt', localStorage.getItem('token')).then(
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
)
