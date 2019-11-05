import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Dashboard from '@/components/Dashboard.vue';
import Actividades from '@/components/admin/Actividades.vue';
import Eventos from '@/components/admin/Eventos.vue';
import Profile from '@/components/Profile.vue';
import Home from '@/views/Home.vue';
import store from '../store/index';

import RutasHome from './home';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LoginRegister',
    component: Login,
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
  },
  { 
    path: '/actividades', 
    name: 'Actividades', 
    component: Actividades,
    meta: {
      requiresAuth: true,
      is_admin: true
    }
  },
  { 
    path: '/eventos', 
    name: 'Eventos', 
    component: Eventos,
    meta: {
      requiresAuth: true,
      is_admin: true
    }
  },
  { 
    path: '/home', 
    component: Home,
    children: RutasHome,
    meta: {
      requiresAuth: false,
      is_admin: true
    }
  }
];

const router = new VueRouter({
  routes,
  linkActiveClass: "active",
  mode: "history"
})

export default router

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
      }
    }
    else {
      // eslint-disable-next-line callback-return
      next('/'); 
    }

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

