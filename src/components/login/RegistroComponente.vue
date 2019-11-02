<template>
  <div class="mx-3">
    <v-card-text>
      <v-form @submit.prevent="submit">
        <v-row>
          <v-col lg="6">
            <v-text-field
              v-model="nombres"
              required
              label="Nombres"
              icon="user"
              type="text"
              class="mb-1"
            />
          </v-col>
          <v-col lg="6">
            <v-text-field
              v-model="apellidos"
              required
              label="Apellidos"
              icon="user"
              type="text"
              class="mb-1"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col lg="6">
            <v-text-field
              v-model="numCuentaEmpleado"
              required
              label="# de cuenta/empleado"
              icon="address-card"
              type="number"
              class="mb-1"
            />
          </v-col>
          <v-col lg="6">
            <v-text-field
              v-model="telefono"
              required
              label="Teléfono"
              icon="mobile-alt"
              type="number"
              class="mb-1"
            />
          </v-col>
        </v-row>
        <v-row>
          <div class="col-lg-12">
            <v-text-field
              required
              v-model="$v.email.$model"
              :class="{'is-invalid': $v.email.$error}"
              label="Correo"
              icon="envelope"
              type="email"
              class="mb-1"
            />
          </div>
        </v-row>
        <v-row>
          <v-col lg="6">
            <v-text-field
              required
              v-model="$v.password.$model"
              :class="{'is-invalid': $v.password.$error}"
              label="Contraseña"
              icon="lock"
              type="password"
              class="mb-1"
            />
          </v-col>
          <v-col lg="6">
            <v-text-field
              required
              v-model="$v.repeatPassword.$model"
              :class="{'is-invalid': $v.repeatPassword.$error}"
              label="Repetir contraseña"
              icon="lock"
              type="password"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col lg="12" v-if="!$v.password.minLength">
            <p class="text-danger">La contraseña debe contener al menos seis caracteres.</p>
          </v-col>
          <v-col lg="12" v-if="!$v.repeatPassword.sameAsPassword">
            <p class="text-danger">Las contraseñas no son iguales.</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col lg="12" v-if="submitStatus === 'ERROR'">
            <p class="text-danger">Favor llenar el formulario correctamente.</p>
          </v-col>
          <v-col lg="12" v-if="status === 'Error'">
            <p class="text-danger">{{errMensaje}}</p>
          </v-col>
          <v-col lg="12" v-if="status === 'Cargando'">
            <p class="text-success">Enviando...</p>
          </v-col>
        </v-row>
        <div class="mt-2 text-center">
          <v-btn large color="info" type="submit">
            Registrar
            <v-icon class="ml-1">mdi-login</v-icon>
          </v-btn>
        </div>
      </v-form>
    </v-card-text>
    <v-card-actions center>
      <v-row class="w-100">
        <v-col class="12">
          <div class="options text-center mt-1">
            <p>
              ¿Ya tienes una cuenta?
              <a href="#" @click="tabs=1">Iniciar sesión</a>
            </p>
          </div>
        </v-col>
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
  name: "registro"
})
export default class RegistroComponent extends Vue {
  @Validate({ required, email })
  private email: String = "";

  @Validate({ required, minLength: minLength(6) })
  private password: String = "";

  @Validate({ required, minLength: minLength(6) })
  private repeatPassword: String = "";

  private numCuentaEmpleado = "";
  private nombres: String = "";
  private apellidos: String = "";
  private telefono = "";
  private submitStatus: any = null;
  private cascading: boolean = false;

  @Action("register")
  public register(usuario: any): any {}

  @State("status") private status!: any;
  @State("errMensaje") private errMensaje!: any;

  submit() {
    this.$v.password.$touch();
    this.$v.email.$touch();
    this.$v.repeatPassword.$touch();
    if (
      this.$v.password.$invalid ||
      this.$v.repeatPassword.$invalid ||
      this.$v.email.$invalid
    ) {
      this.submitStatus = "ERROR";
    } else {
      let tipoUsuario = 4;
      let numCuentaEmpleado = this.numCuentaEmpleado;
      let nombres = this.nombres;
      let apellidos = this.apellidos;
      let correo = this.$v.email.$model;
      let telefono = this.telefono;
      let contrasenia = this.$v.password.$model;
      this.register({
        tipoUsuario,
        numCuentaEmpleado,
        nombres,
        apellidos,
        correo,
        telefono,
        contrasenia
      }).then(() => router.push({ name: "Admin" }));
    }
  }
}
</script>