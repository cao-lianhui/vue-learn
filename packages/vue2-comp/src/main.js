import Vue from 'vue'
import ElementUI from 'element-ui'
import iView from 'view-design'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import 'view-design/dist/styles/iview.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(iView)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
