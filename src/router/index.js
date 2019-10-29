/* eslint-disable callback-return */
import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
import LoginRegister from '@/components/LoginRegister';
import Dashboard from '@/components/Dashboard';
import Profile from '@/components/Profile';

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'LoginRegister',
      component: LoginRegister,
      meta: {
        guest: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Dashboard,
      meta: {
        requiresAuth: true,
        is_admin: true
      }
    }
  ],
  linkActiveClass: "active",
  mode: "history"
});

export default router;

/*export default new router({
  routes: [
    {
      path: '/',
      name: 'LoginRegister',
      component: LoginRegister
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Dashboard,
      meta: {
        requiresAuth: true,
        is_admin: true
      }
    }
  ],
  linkActiveClass: "active",
  mode: "history"
});*/

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      if (to.matched.some(record => record.meta.is_admin)){
        if (store.getters.isAdmin){
          // eslint-disable-next-line callback-return
          next();
        } else {
          next('/profile');
        }
      } else {
        next();
        return;
      }
    }
    // eslint-disable-next-line callback-return
    next('/'); 
  } else if (to.matched.some(record => record.meta.guest)){
    if (store.getters.isLoggedIn) {
      if (store.getters.isAdmin){
        next('/admin');
      } else {
        next('/profile');
      }
    }
    else {
      next();
    }
  } 
  else {
    // eslint-disable-next-line callback-return
    next(); 
  }
});
