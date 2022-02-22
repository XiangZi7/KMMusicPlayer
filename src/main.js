
import Vue from 'vue'
import App from './App'
import router from './router'

// 饿了么
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import vueConfig from './vue.config';

//导入Vuex
import store from './store/index'
// 饿了么
Vue.use(ElementUI);




Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
