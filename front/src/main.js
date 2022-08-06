import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import VeeValidate, { Validator } from 'vee-validate'
// method1 to zh-cn
// import zh from 'vee-validate/dist/locale/zh_CN'

// method2 to zh-cn
import './local/index'

Vue.use(VeeValidate)
// method1 to zh-cn
// Validator.localize('zh-CN', zh)

// method2 to zh-cn
const validator = new Validator()
validator.localize('zh-CN')

Vue.config.productionTip = false

axios.defaults.baseURL =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3000'
    : 'http://your.domain.com'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
