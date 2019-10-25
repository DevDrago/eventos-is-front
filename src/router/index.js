import Vue from 'vue';
import Router from 'vue-router';
import LoginRegister from '@/components/LoginRegister';
import Dashboard from '@/components/Dashboard';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LoginRegister',
      component: LoginRegister
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Dashboard
    }
  ],
  linkActiveClass: "active",
  mode: "history"
});
