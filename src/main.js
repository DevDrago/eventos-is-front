// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbvue/build/css/mdb.css';

import Vue from 'vue';
import App from './App';
import router from './router';
import Vuelidate from 'vuelidate';
import store from './store';
import Axios from 'axios';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(Vuelidate);

Vue.config.productionTip = false;

Vue.prototype.$http = Axios;
Axios.defaults.withCredentials = true;
const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = token;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  vuetify,
  template: '<App/>'
});