<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      v-if="isLoggedIn"
    >
      <div class="d-flex align-center">

        <a style="font-size:20px;" href="/" class="text-white">Sistema de Eventos IS</a>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="/usuarios"
        text
        v-if="isLoggedIn && isAdmin"
      >
        <span>Usuarios</span>
        
      </v-btn>
      <v-btn
        href="/eventos"
        text
        v-if="isLoggedIn && isAdmin"
      >
        <span>Eventos</span>
      </v-btn>
            <v-btn
        href="/actividades"
        text
        v-if="isLoggedIn && isAdmin"
      >
        <span>Actividades</span>
      </v-btn>
      <v-btn
        @click="cerrarSesion" v-if="isLoggedIn" text
      >
        <span class="mr-2">Cerrar sesión</span>
        <v-icon class="icon-p">fas fa-sign-out-alt</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer
      :padless=true
    >
      <v-card
        flat
        tile
        color="primary"
        width="100%"
        class="text-center"
      >
        <v-card-text class="white--text">
          &copy; {{ new Date().getFullYear() }} IS UNAH. Todos los derechos reservados.
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import {mapActions, mapGetters, mapState} from 'vuex';
import router from './router/index';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },
  methods:{
		...mapActions(['logout']),
		cerrarSesion(){
			this.logout().then(() => router.push({name:'LoginRegister'}));
		}
	},
	computed:{
		...mapGetters(['isLoggedIn', 'isAdmin'])
	},

  data: () => ({
    icons: [
        'mdi-home',
        'mdi-email',
        'mdi-calendar',
        'mdi-delete',
      ],
      items: [
        'default',
        'absolute',
        'fixed',
      ],
      padless: false,
      variant: 'default',
  }),
};
</script>
<style>
  body { background-color: #DDD }
  #app {
    margin: 0 auto;
    padding-top: 15px;
    padding-right: 15px;
    padding-left: 15px;
    max-width: 100%;
  }
  .v-btn.v-size--default {
    font-size: 0.74rem;
  }
  .icon-p{
    font-size: 15px !important;
  }
</style>
