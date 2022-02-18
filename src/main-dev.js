import Vue from 'vue'
import App from './App.vue'
import { getLivesWeatherData, getForecastData } from '@/api/index.js'
// 引入全局样式
import '@/assets/global.css'

// 引入element -ui
import '@/utils/element-ui.js'
import '@/utils/dateFormate.js'
import router from '@/router'

Vue.prototype.$getLivesWeatherData = getLivesWeatherData
Vue.prototype.$getForecastData = getForecastData

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
