import Admin from '@/components/Admin.vue';

export default [
  {
    path: '',
    name: 'home',
    component: Admin,
  },
  {
    path: 'actividades',
    name: 'actividades',
    component: () => import(/* webpackChunkName: "actividades" */ '@/components/admin/Actividades.vue'),
  },
  {
    path: 'eventos',
    name: 'eventos',
    component: () => import(/* webpackChunkName: "inmueble" */ '@/components/admin/Eventos.vue'),
  }
];