<template>

</template>

<style>
.login-logo {
	height: 150px;
}
.login-logo-cont { text-align: center; }
.login-cont { background-color: white; border-radius: 4px; }
</style>

<script>
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators';
import {mapActions, mapState} from 'vuex';
import router from '../router/index';
export default {
	name: 'LoginRegister',
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
		email: { required, email },
		emailLogin: { required, email },
		password: { required, minLength: minLength(6) },
		passwordLogin:{ required, minLength: minLength(6) },
		repeatPassword:{ sameAsPassword: sameAs('password') }
	},
	methods:{
		tabsF(tabIndex){
			this.submitStatus = '';
			this.submitStatusLogin = '';
			this.tabs = tabIndex;
			this.clear();
		},
		...mapActions(['login', 'register', 'clear']),
		submit(){
			this.$v.password.$touch();
			this.$v.email.$touch();
			this.$v.repeatPassword.$touch();
			if (this.$v.password.$invalid || this.$v.repeatPassword.$invalid || this.$v.email.$invalid ) {
				this.submitStatus = 'ERROR';
			} else {
				let tipoUsuario = 4;
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