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
                    <mdb-input label="Correo" icon="envelope" type="email" class="mb-5"/>
                    <mdb-input label="Contraseña" icon="lock" type="password"/>
                    <div class="mt-2 text-center">
                        <mdb-btn color="info">Iniciar <mdb-icon icon="sign-in-alt" class="ml-1"/></mdb-btn>
                    </div>
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
                    <div class="row">
                        <div class="col-lg-6"><mdb-input label="Nombres" icon="user" type="text" class="mb-1"/></div>
                        <div class="col-lg-6"><mdb-input label="Apellidos" icon="user" type="text" class="mb-1"/></div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6"><mdb-input label="# de cuenta/empleado" icon="address-card" type="number" class="mb-1"/></div>
                        <div class="col-lg-6"><mdb-input label="Teléfono" icon="mobile-alt" type="number" class="mb-1"/></div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12"><mdb-input label="Correo" icon="envelope" type="email" class="mb-1"/></div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6"><mdb-input label="Contraseña" icon="lock" type="password" class="mb-1"/></div>
                        <div class="col-lg-6"><mdb-input label="Repetir contraseña" icon="lock" type="password"/></div>
                    </div>
                    <div class="mt-2 text-center">
                        <mdb-btn color="info">Registrar<mdb-icon icon="sign-in-alt" class="ml-1"/></mdb-btn>
                    </div>
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
</style>

<script>
    import { mdbContainer, mdbRow, mdbCol, mdbBtn, mdbModal, mdbTab, mdbTabItem, mdbModalBody, mdbInput, mdbModalFooter, mdbModalTitle, mdbIcon } from 'mdbvue';
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
                cascading: false,
                tabs: 1
            }
        }
    }
</script>