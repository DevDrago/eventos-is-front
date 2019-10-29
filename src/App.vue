<template>
	<div>
		<!-- Menú -->
		<mdb-navbar expand="large" dark color="light-blue" class="mb-5 darken-3">
			<mdb-navbar-brand>
				<a href="/" class="text-white">Sistema de Eventos IS</a>
			</mdb-navbar-brand>
			<mdb-navbar-toggler>
				<mdb-navbar-nav right>
					<mdb-nav-item href="#">Usuarios</mdb-nav-item>
					<mdb-nav-item href="#">Eventos</mdb-nav-item>
					<mdb-nav-item @click="cerrarSesion" v-if="isLoggedIn">Cerrar sesión</mdb-nav-item>
				</mdb-navbar-nav>
			</mdb-navbar-toggler>
		</mdb-navbar>
		<!-- Menú -->
		
		<mdbContainer>
			<router-view></router-view>
		</mdbContainer>
		
		<!-- Footer -->
		<mdb-footer class="font-small pt-4 mt-4">
			<div class="footer-copyright text-center py-3 light-blue darken-3 white-text">
				<mdb-container fluid>
					&copy; {{ new Date().getFullYear() }} IS UNAH. Todos los derechos reservados.
				</mdb-container>
			</div>
		</mdb-footer>
		<!-- Footer -->
	</div>
</template>


<!--<LoginRegister/>-->

<script>
import { mdbFooter, mdbContainer, mdbRow, mdbCol, mdbDropdown, mdbDropdownToggle, mdbDropdownMenu, mdbDropdownItem, mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, mdbNavItem } from 'mdbvue';
import {mapActions, mapGetters} from 'vuex';
import router from './router/index';
export default {
	name: "App",
	components: {
		mdbFooter,
		mdbContainer,
		mdbRow,
		mdbCol,
		mdbNavbar,
		mdbNavbarBrand,
		mdbNavbarToggler,
		mdbNavbarNav,
		mdbNavItem,
		mdbDropdown,
		mdbDropdownToggle,
		mdbDropdownMenu,
		mdbDropdownItem
	}
};
</script>

<style>
body { background-color: #DDD }
.app {
  margin: 0 auto;
  font-family: sans-serif;
  padding: 10px;
  max-width: 100%;
}
</style>