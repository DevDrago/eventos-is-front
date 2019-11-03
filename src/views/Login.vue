<template>
  <div>
    <v-app-bar color="light-blue darken-3" dark>
      <v-toolbar-title>{{$appName}}</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <v-row justify="center">
          <v-col lg="6" sm="8" cols="12" align="center">
            <v-card raised>
              <v-container>
                <v-img class="login-logo my-5" src="@/assets/logo-is.jpg" contain></v-img>
              </v-container>
              <v-tabs fixed-tabs background-color="light-blue darken-3" dark v-model="tabs">
                <v-tab>
                  <v-icon class="mr-1">mdi-account</v-icon>Iniciar Sesión
                </v-tab>
                <v-tab>
                  <v-icon class="mr-1">mdi-account-plus</v-icon>Registro
                </v-tab>
              </v-tabs>
              <v-tabs-items v-model="tabs">
                <v-tab-item>
                  <LoginComponent>
                    <template slot="acciones">
                      <v-col lg="6">
                        <div class="options text-center mt-1">
                          <p>
                            ¿No estás registrado?
                            <a href="#" @click="tabs=1">Registrar</a>
                          </p>
                        </div>
                      </v-col>
                      <v-col lg="6" class="text-center">
                        <div class="options text-center mt-1">
                          <p>
                            ¿Olvidaste tu
                            <a href="#">contraseña</a>?
                          </p>
                        </div>
                      </v-col>
                    </template>
                  </LoginComponent>
                </v-tab-item>
                <v-tab-item>
                  <RegistroComponent>
                    <template slot="acciones">
                      <v-col class="12">
                        <div class="options text-center mt-1">
                          <p>
                            ¿Ya tienes una cuenta?
                            <a href="#" @click="tabs=0">Iniciar sesión</a>
                          </p>
                        </div>
                      </v-col>
                    </template>
                  </RegistroComponent>
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
import LoginComponent from "@/components/login/LoginComponent.vue";
import RegistroComponent from "@/components/login/RegistroComponente.vue";

@Component({
  components: {
    LoginComponent,
    RegistroComponent
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
  box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
  border: 0;
  padding: 0.7rem;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: -20px;
  background-color: #2bbbad;
  z-index: 1;
  position: relative;
  border-radius: 0.25rem;
}
.md-tabs .nav-item.open .nav-link,
.md-tabs .nav-link.active {
  background-color: rgba(0, 0, 0, 0.2);
  color: #fff;
  transition: all 1s;
  border-radius: 0.25rem;
  border-color: transparent;
}
.nav-tabs .nav-link {
  border: 0px solid transparent;
  color: #fff;
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
.is-invalid
  input[type="email"]:not(.browser-default):focus:not([readonly])
  + label {
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