import Vue, { h } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'normalize.css/normalize.css'; // a normal css style
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import "@/styles/index.scss"; // global css
import "@/icons"; // icon
import "@/permission"; // permission control
import { hasButtonPermission } from "@/utils/permission"; // determine button permission

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.hasPerm = hasButtonPermission;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
