<template>
  <div class="mx-3">
    <v-card-text>
      <v-form @submit.prevent="submit">
        <div class="row">
          <div class="col-lg-6">
            <mdb-input
              v-model="nombres"
              required
              label="Nombres"
              icon="user"
              type="text"
              class="mb-1"
            />
          </div>
          <div class="col-lg-6">
            <mdb-input
              v-model="apellidos"
              required
              label="Apellidos"
              icon="user"
              type="text"
              class="mb-1"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <mdb-input
              v-model="numCuentaEmpleado"
              required
              label="# de cuenta/empleado"
              icon="address-card"
              type="number"
              class="mb-1"
            />
          </div>
          <div class="col-lg-6">
            <mdb-input
              v-model="telefono"
              required
              label="Teléfono"
              icon="mobile-alt"
              type="number"
              class="mb-1"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <mdb-input
              required
              v-model="$v.email.$model"
              :class="{'is-invalid': $v.email.$error}"
              label="Correo"
              icon="envelope"
              type="email"
              class="mb-1"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <mdb-input
              required
              v-model="$v.password.$model"
              :class="{'is-invalid': $v.password.$error}"
              label="Contraseña"
              icon="lock"
              type="password"
              class="mb-1"
            />
          </div>
          <div class="col-lg-6">
            <mdb-input
              required
              v-model="$v.repeatPassword.$model"
              :class="{'is-invalid': $v.repeatPassword.$error}"
              label="Repetir contraseña"
              icon="lock"
              type="password"
            />
          </div>
          <div class="col-lg-12" v-if="!$v.password.minLength">
            <p class="text-danger">La contraseña debe contener al menos seis caracteres.</p>
          </div>
          <div class="col-lg-12" v-if="!$v.repeatPassword.sameAsPassword">
            <p class="text-danger">Las contraseñas no son iguales.</p>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12" v-if="submitStatus === 'ERROR'">
            <p class="text-danger">Favor llenar el formulario correctamente.</p>
          </div>
          <div class="col-lg-12" v-if="status === 'Error'">
            <p class="text-danger">{{errMensaje}}</p>
          </div>
          <div class="col-lg-12" v-if="status === 'Cargando'">
            <p class="text-success">Enviando...</p>
          </div>
        </div>
        <div class="mt-2 text-center">
          <mdb-btn type="submit" color="info">
            Registrar
            <mdb-icon icon="sign-in-alt" class="ml-1" />
          </mdb-btn>
        </div>
      </v-form>
      <mdb-modal-footer center>
        <div class="row w-100">
          <div class="col-lg-12">
            <div class="options text-center mt-1">
              <p>
                ¿Ya tienes una cuenta?
                <a href="#" @click="tabs=1">Iniciar sesión</a>
              </p>
            </div>
          </div>
        </div>
      </mdb-modal-footer>
    </v-card-text>
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
import {
  mdbContainer,
  mdbRow,
  mdbCol,
  mdbBtn,
  mdbModal,
  mdbTab,
  mdbTabItem,
  mdbModalBody,
  mdbInput,
  mdbModalFooter,
  mdbModalTitle,
  mdbIcon
} from "mdbvue";
@Component({
  name: "registro",
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbBtn,
    mdbTab,
    mdbTabItem,
    mdbModalBody,
    mdbInput,
    mdbModalFooter,
    mdbIcon
  }
})
export default class RegistroComponent extends Vue {
  @Validate({ required, email })
  private email: String = "";

  @Validate({ required, minLength: minLength(6) })
  private password: String = "";

  @Validate({ required, minLength: minLength(6) })
  private repeatPassword: String = "null";

  private numCuentaEmpleado: number = 0;
  private nombres: String = "null";
  private apellidos: String = "null";
  private telefono: number = 0;
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