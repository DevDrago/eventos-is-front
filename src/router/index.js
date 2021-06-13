/* eslint-disable callback-return */
import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
import LoginRegister from '@/components/LoginRegister';
import Dashboard from '@/components/Dashboard';
import CategoriaActividad from '@/components/admin/CategoriaActividad';
import Actividades from '@/components/admin/Actividades';
import Eventos from '@/components/admin/Eventos';
//import Profile from '@/components/Profile';
import Usuarios from '@/components/admin/Usuarios';
import ResponsableActividad from '@/components/admin/ResponsableActividad';
import TipoRecurso from '@/components/admin/TipoRecurso';
import Recurso from '@/components/admin/Recurso';
import TipoUsuario from '@/components/admin/TipoUsuario';
import AsistenciaActividad from '@/components/admin/AsistenciaActividad';

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
    //{
    //  path: '/profile',
    //  name: 'Profile',
    //  component: Profile,
    //  meta: {
    //    requiresAuth: true
    //  }
    //},
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
      path: '/usuarios', 
      name: 'Usuarios', 
      component: Usuarios,
      meta: {
        requiresAuth: true,
        is_admin: true
      }
    },
    { 
      path: '/categoria-actividad', 
      name: 'CategoriaActividad', 
      component: CategoriaActividad,
      meta: {
        requiresAuth: true,
        is_admin: true
      }
    },
    { 
      path: '/responsable-actividad', 
      name: 'ResponsableActividad', 
      component: ResponsableActividad,
      meta: {
        requiresAuth: true,
        is_admin: true
      }
    },
    { 
      path: '/tipo-recurso', 
      name: 'TipoRecurso', 
      component: TipoRecurso,
      meta: {
        requiresAuth: true,
        is_admin: true
      }
    },
    { 
      path: '/recurso', 
      name: 'Recurso', 
      component: Recurso,
      meta: {
        requiresAuth: true,
        is_admin: true
      }
    },
    { 
      path: '/tipo-usuario', 
      name: 'TipoUsuario', 
      component: TipoUsuario,
      meta: {
        requiresAuth: true,
        is_admin: true
      }
    },
    { 
      path: '/asistencia', 
      name: 'AsistenciaActividad', 
      component: AsistenciaActividad,
      meta: {
        requiresAuth: true,
        is_admin: true
      }
    },
  ],
  linkActiveClass: "active",
  mode: "history"
});

export default router;

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
