<template>
    <mdb-navbar rounded expand="large" dark color="stylish">
        <mdb-navbar-brand href="#">
            IS EVENTOS
        </mdb-navbar-brand>
        <mdb-navbar-toggler>
            <mdb-navbar-nav right>
                <mdb-nav-item href="#" active>Inicio</mdb-nav-item>
                <mdb-nav-item href="#">Link</mdb-nav-item>
                <mdb-dropdown tag="li" class="nav-item">
                    <mdb-dropdown-toggle tag="a" navLink color="stylish" slot="toggle" waves-fixed>Dropdown</mdb-dropdown-toggle>
                    <mdb-dropdown-menu>
                        <mdb-dropdown-item>Action</mdb-dropdown-item>
                        <mdb-dropdown-item>Another action</mdb-dropdown-item>
                        <mdb-dropdown-item>Something else here</mdb-dropdown-item>
                    </mdb-dropdown-menu>
                </mdb-dropdown>
                <mdb-btn href="#" rounded color="default" @click.prevent="cascading = true">INICIAR SESIÓN <mdb-icon icon="eye" class="ml-1"/></mdb-btn>
            </mdb-navbar-nav>
        </mdb-navbar-toggler>
    </mdb-navbar>
</template>

<script>
  import { mdbBtn, mdbIcon, mdbDropdown, mdbDropdownToggle, mdbDropdownMenu, mdbDropdownItem, mdbContainer, mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, mdbNavItem } from 'mdbvue';
  export default {
    name: 'Navbar',
    components: {
      mdbBtn,
      mdbIcon,
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
  }
</script>