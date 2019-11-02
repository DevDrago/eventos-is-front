<template>
  <div class="mx-3">
    <v-card-text>
      <v-form @submit.prevent="submitLogin">
        <v-text-field
          prepend-icon="mdi-email"
          v-model="$v.emailLogin.$model"
          required
          label="Correo"
          :class="{'is-invalid': $v.emailLogin.$error}"
          type="email"
        />
        <v-text-field
          prepend-icon="mdi-lock"
          v-model="$v.passwordLogin.$model"
          :class="{'is-invalid': $v.passwordLogin.$error}"
          required
          label="Contraseña"
          type="password"
        />
        <p
          v-if="!$v.passwordLogin.minLength"
          class="text-danger"
        >La contraseña debe contener al menos seis caracteres.</p>
        <p
          v-if="submitStatusLogin === 'ERROR'"
          class="text-danger"
        >Favor llenar el formulario correctamente.</p>
        <v-col lg="12" v-if="status === 'Error'">
          <p class="text-danger">{{errMensaje}}</p>
        </v-col>
        <p v-if="status === 'Cargando'" class="text-success">Enviando...</p>
        <div class="my-2">
          <v-btn 
          large 
          color="info"
          type="submit"
          >
            Iniciar
            <v-icon class="ml-1">mdi-login</v-icon>
          </v-btn>
        </div>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-row class="w-100">
       <slot name="acciones"></slot>
      </v-row>
    </v-card-actions>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Action, State } from "vuex-class";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs
} from "vuelidate/lib/validators";
import router from "@/router/index";
import { Validate } from "vuelidate-property-decorators";
@Component({
  name: "login"
})
export default class LoginComponent extends Vue {
  @Validate({ required, email })
  private emailLogin: String = "";

  @Validate({ required, minLength: minLength(6) })
  private passwordLogin: String = "";
  private submitStatusLogin: any = null;

  @Action("login")
  public login(usuario: any): any {}

  @State("status") private status!: any;
  @State("errMensaje") private errMensaje!: any;

  submitLogin() {
    this.$v.passwordLogin.$touch();
    this.$v.emailLogin.$touch();
    if (this.$v.passwordLogin.$invalid || this.$v.emailLogin.$invalid) {
      this.submitStatusLogin = "ERROR";
    } else {
      let correo = this.$v.emailLogin.$model;
      let contrasenia = this.$v.passwordLogin.$model;
      this.login({ correo, contrasenia }).then(() =>
        router.push({ name: "Admin" })
      );
    }
  }
}
</script>