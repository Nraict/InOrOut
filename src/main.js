import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入公共样式
import './style/common.css'

//调用api里面的axios.js
import './api'







Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
