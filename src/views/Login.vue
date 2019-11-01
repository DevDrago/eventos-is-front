<template>
  <div>
    <v-app-bar color="light-blue darken-3" dark>
      <v-toolbar-title>Sistema de Eventos IS</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="8" align="center">
            <v-card raised>
              <v-container>
                <v-img class="login-logo my-5" src="@/assets/logo-is.jpg" contain></v-img>
              </v-container>
              <v-tabs fixed-tabs background-color="light-blue darken-3" dark v-model="tabs">
                <v-tab>
                  <v-icon class="mr-1">mdi-account</v-icon>Iniciar Sesión
                </v-tab>
                <v-tab> <v-icon class="mr-1">mdi-account-plus</v-icon>Registro</v-tab>
              </v-tabs>
              <v-tabs-items v-model="tabs">
                <v-tab-item>
                  <LoginComponent></LoginComponent>
                  
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginComponent from '@/components/login/LoginComponent.vue';

@Component({
  components: {
    LoginComponent,
  }
})
export default class Login extends Vue {
  private tabs: number = 0;
  constructor() {
    super();
  }
}
</script>

<style>
.md-tabs {
    box-shadow: 0 5px 11px 0 rgba(0,0,0,.18), 0 4px 15px 0 rgba(0,0,0,.15);
    border: 0;
    padding: .7rem;
    margin-left: 1rem;
    margin-right: 1rem;
    margin-bottom: -20px;
    background-color: #2bbbad;
    z-index: 1;
    position: relative;
    border-radius: .25rem;
}
.md-tabs .nav-item.open .nav-link, .md-tabs .nav-link.active {
    background-color: rgba(0,0,0,.2);
    color: #fff;
    transition: all 1s;
    border-radius: .25rem;
    border-color: transparent;
}
.nav-tabs .nav-link {
    border: 0px solid transparent;
    color: #FFF;
}
.login-logo {
  height: 150px;
}
.login-logo-cont {
  text-align: center;
}
.is-invalid input {
    border-bottom: 1px solid #dc3545 !important;
    box-shadow: none !important;
}
.is-invalid input[type="email"]:not(.browser-default):focus:not([readonly]) + label {
    color: #dc3545 !important;
}
.is-invalid .prefix.active {
    color: #dc3545 !important;
}
.is-invalid .prefix {
    color: #dc3545 !important;
}
.is-invalid label {
    color: #dc3545 !important;
}
</style>