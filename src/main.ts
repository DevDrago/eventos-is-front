import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate';
import Axios from 'axios';
import vuetify from './plugins/vuetify';

Vue.use(Vuelidate);


Vue.config.productionTip = false

Vue.prototype.$http = Axios;
Vue.prototype.$appName = 'Sistema de Eventos IS';
Axios.defaults.withCredentials = true;
const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = token;
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
