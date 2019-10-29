import Vue from 'vue';
import Router from 'vue-router';
import LoginRegister from '@/components/LoginRegister';
import Dashboard from '@/components/Dashboard';
import Datatables from '@/components/admin/Actividades';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', name: 'LoginRegister', component: LoginRegister },
    { path: '/admin', name: 'Admin', component: Dashboard },
    { path: '/actividades', name: 'Actividades', component: Datatables }
  ],
  linkActiveClass: "active",
  mode: "history"
});
