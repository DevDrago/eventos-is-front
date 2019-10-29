<template>
    <mdb-container>
        <mdb-row cascade tabs>
            <mdb-col col="lg-2" md="2"></mdb-col>
            <mdb-col col="lg-8" md="8" class="login-cont">
                <mdb-row>
                    <mdb-col class="login-logo-cont my-3">
                        <img class="login-logo img-fluid" alt="Logo IS" src="../assets/logo-is.jpg"/>
                    </mdb-col>
                </mdb-row>
                <mdb-tab tabs justify class="light-blue darken-3">
                    <mdb-tab-item :active="tabs==1" @click.native.prevent="tabs = 1"><mdb-icon icon="user" class="mr-1"/> Iniciar Sesión</mdb-tab-item>
                    <mdb-tab-item :active="tabs==2" @click.native.prevent="tabs = 2"><mdb-icon icon="user-plus" class="mr-1"/> Registro</mdb-tab-item>
                </mdb-tab>
                <mdb-modal-body class="mx-3" v-if="tabs==1">
                    <form @submit.prevent="submitLogin">
                        <mdb-input v-model="$v.emailLogin.$model" required label="Correo" :class="{'is-invalid': $v.emailLogin.$error}" icon="envelope" type="email" class="mb-5"/>
                        <mdb-input v-model="$v.passwordLogin.$model" :class="{'is-invalid': $v.passwordLogin.$error}" required label="Contraseña" icon="lock" type="password"/>
                        <p v-if="!$v.passwordLogin.minLength" class="text-danger">La contraseña debe contener al menos seis caracteres.</p>
                        <p v-if="submitStatusLogin === 'ERROR'" class="text-danger">Favor llenar el formulario correctamente.</p>
                        <div class="col-lg-12" v-if="status === 'Error'"><p class="text-danger">{{errMensaje}}</p></div>
                        <p v-if="status === 'Cargando'" class="text-success">Enviando...</p>
                        <div class="mt-2 text-center">
                            <mdb-btn type="submit" color="info">Iniciar <mdb-icon icon="sign-in-alt" class="ml-1"/></mdb-btn>
                        </div>
                    </form>
                </mdb-modal-body>
                <mdb-modal-footer center v-if="tabs==1">
                    <div class="row w-100">
                        <div class="col-lg-6">
                            <div class="options text-center mt-1">
                                <p>¿No estás registrado? <a href="#" @click="tabs=2">Registrar</a></p>
                            </div>
                        </div>
                        <div class="col-lg-6 text-center">
                            <div class="options text-center mt-1">
                                <p>¿Olvidaste tu <a href="#">contraseña</a>?</p>
                            </div>
                        </div>
                    </div>
                </mdb-modal-footer>
                <mdb-modal-body class="mx-3" v-if="tabs==2">
                    <form @submit.prevent="submit">
                        <div class="row">
                            <div class="col-lg-6"><mdb-input v-model="nombres" required label="Nombres" icon="user" type="text" class="mb-1"/></div>
                            <div class="col-lg-6"><mdb-input v-model="apellidos" required label="Apellidos" icon="user" type="text" class="mb-1"/></div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6"><mdb-input v-model="numCuentaEmpleado" required label="# de cuenta/empleado" icon="address-card" type="number" class="mb-1"/></div>
                            <div class="col-lg-6"><mdb-input v-model="telefono" required label="Teléfono" icon="mobile-alt" type="number" class="mb-1"/></div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12"><mdb-input required v-model="$v.email.$model" :class="{'is-invalid': $v.email.$error}" label="Correo" icon="envelope" type="email" class="mb-1"/></div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6"><mdb-input required v-model="$v.password.$model" :class="{'is-invalid': $v.password.$error}" label="Contraseña" icon="lock" type="password" class="mb-1"/></div>
                            <div class="col-lg-6"><mdb-input required v-model="$v.repeatPassword.$model" :class="{'is-invalid': $v.repeatPassword.$error}" label="Repetir contraseña" icon="lock" type="password"/></div>
                            <div class="col-lg-12" v-if="!$v.password.minLength"><p class="text-danger">La contraseña debe contener al menos seis caracteres.</p></div>
                            <div class="col-lg-12" v-if="!$v.repeatPassword.sameAsPassword"><p class="text-danger">Las contraseñas no son iguales.</p></div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12" v-if="submitStatus === 'ERROR'"><p class="text-danger">Favor llenar el formulario correctamente.</p></div>
                            <div class="col-lg-12" v-if="status === 'Error'"><p class="text-danger">{{errMensaje}}</p></div>
                            <div class="col-lg-12" v-if="status === 'Cargando'"><p class="text-success">Enviando...</p></div>
                        </div>
                        <div class="mt-2 text-center">
                            <mdb-btn type="submit" color="info">Registrar<mdb-icon icon="sign-in-alt" class="ml-1"/></mdb-btn>
                        </div>
                    </form>
                </mdb-modal-body>
                <mdb-modal-footer center v-if="tabs==2">
                    <div class="row w-100">
                        <div class="col-lg-12">
                            <div class="options text-center mt-1">
                                <p>¿Ya tienes una cuenta? <a href="#" @click="tabs=1">Iniciar sesión</a></p>
                            </div>
                        </div>
                    </div>
                </mdb-modal-footer>
            </mdb-col>
        </mdb-row>
    </mdb-container>
</template>

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
.login-logo-cont { text-align: center; }
.login-cont { background-color: white; border-radius: 4px; }
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

<script>
    import { mdbContainer, mdbRow, mdbCol, mdbBtn, mdbModal, mdbTab, mdbTabItem, mdbModalBody, mdbInput, mdbModalFooter, mdbModalTitle, mdbIcon } from 'mdbvue';
    import { required, email, sameAs, minLength } from 'vuelidate/lib/validators';
    import {mapActions, mapState} from 'vuex';
    import router from '../router/index';
    export default {
        name: 'LoginRegister',
            components: {
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
            mdbIcon,
            mdbModalTitle,
            mdbModalTitle
        },
        data() {
            return {
                email:'',
                emailLogin:'',
                password: '',
                passwordLogin: '',
                repeatPassword: '',
                numCuentaEmpleado: '',
                nombres: '',
                apellidos: '',
                telefono: '',
                submitStatus: null,
                submitStatusLogin: null,
                cascading: false,
                tabs: 1
            }
        },
        validations: {
            email: {required, email},
            emailLogin: {required, email},
            password:{
                required,
                minLength: minLength(6)
            },
            passwordLogin:{
                required,
                minLength: minLength(6)
            },
            repeatPassword:{
                sameAsPassword: sameAs('password')
            }
        },
        methods:{
            ...mapActions(['login', 'register']),
            submit(){
                this.$v.password.$touch();
                this.$v.email.$touch();
                this.$v.repeatPassword.$touch();
                if (this.$v.password.$invalid || this.$v.repeatPassword.$invalid || this.$v.email.$invalid ) {
                    this.submitStatus = 'ERROR';
                } else {
                    let tipoUsuario = 1;
                    let numCuentaEmpleado = this.numCuentaEmpleado;
                    let nombres = this.nombres;
                    let apellidos = this.apellidos;
                    let correo = this.$v.email.$model;
                    let telefono = this.telefono;
                    let contrasenia = this.$v.password.$model;
                    this.register({tipoUsuario, numCuentaEmpleado, nombres, apellidos,
                                   correo, telefono, contrasenia}).then(()=>router.push({name:'Admin'}));
                }
            },
            submitLogin(){
                this.$v.passwordLogin.$touch();
                this.$v.emailLogin.$touch();
                if (this.$v.passwordLogin.$invalid || this.$v.emailLogin.$invalid ) {
                    this.submitStatusLogin = 'ERROR';
                } else {
                    let correo = this.$v.emailLogin.$model;
                    let contrasenia = this.$v.passwordLogin.$model; 
                    this.login({correo, contrasenia}).then(() => router.push({name:'Admin'}));
                }
            },
        },
        computed:{
            ...mapState(['status', 'errMensaje'])
        }
    }
</script>