import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/reset.css'
import './plugins/element'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/fontawesome'
import api from './api'
import 'babel-polyfill'

Vue.config.productionTip = false;
Vue.prototype.$api = api;

router.afterEach(() => {
  window.scrollTo(0, 0);
})

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
