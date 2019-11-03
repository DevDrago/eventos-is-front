import HelloWorld from '@/components/HelloWorld.vue';

export default [
  {
    path: '',
    name: 'home',
    component: HelloWorld,
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