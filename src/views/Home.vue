<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer" app clipped>
        <v-list dense>
          <v-list-item :to="{ name: 'home'}" exact>
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ name: 'eventos'}">
            <v-list-item-action>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ name: 'actividades'}">
            <v-list-item-action>
              <v-icon>mdi-settings</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app clipped-left dense color="light-blue darken-3" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>{{$appName}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu offset-y class="mx-5">
          <template v-slot:activator="{ on }">
            <v-btn dark icon v-on="on">
              <v-avatar size="32px">
                <!-- <img v-if="usuario.imgPerfil" :src="usuario.imgPerfil" alt="Vuetify" /> -->
                <img
                  src="https://cdn3.iconfinder.com/data/icons/users-groups/512/female-512.png"
                  alt="Vuetify"
                />
              </v-avatar>
            </v-btn>
          </template>
          <v-list class="px-5">
            <v-list-item>
              <v-btn icon to="/perfil" style="color: #232323 !important">
                <v-icon>mdi-account</v-icon>Perfil
              </v-btn>
            </v-list-item>
            <v-list-item @click="cerrarSesion" v-if="isLoggedIn">
              <v-btn icon>
                <v-icon>mdi-logout</v-icon>Salir
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <v-content>
        <v-container fluid >
          <v-row align-content="start" justify="center">
            <router-view></router-view>
          </v-row>
        </v-container>
      </v-content>

      <!-- <v-footer app color="light-blue darken-3" dark>
        <span>&copy; 2019</span>
      </v-footer>-->
    </v-app>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {Action, Getter, State} from 'vuex-class';
import router from '../router';

@Component({})
export default class Home extends Vue {
  private drawer: boolean = false;
  constructor() {
    super();
  }

  @Action("logout")
  public logout(): any{}

  @Getter("isLoggedIn") private isLoggedIn!: any;
  @Getter("isAdmin") private isAdmin!: any;

  cerrarSesion(){
    this.logout().then(()=>router.push({name: '/'}));
  }
}
</script>

<style lang="sass">

</style>