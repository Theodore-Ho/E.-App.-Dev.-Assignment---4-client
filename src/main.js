import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/reset.css'
import './plugins/element'
import 'element-ui/lib/theme-chalk/index.css';
import './plugins/fontawesome'
import api from './api'

Vue.config.productionTip = false;
Vue.prototype.$api = api;

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
