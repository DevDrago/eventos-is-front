<template>
    <v-container>
        <Breadcrumb :items="breadcrumb"></Breadcrumb>
        <Datatable title="Tipos de usuario"
        :columnas="headers"
        :datos="tiposUsuarios"
        :nuevo=true
        :allowDelete=true
        ></Datatable>
        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-form v-model="isFormValid">
                            <v-row>
                                <v-col cols="12" sm="12" md="12">
                                    <v-text-field :rules="[rules.required]" type="text" v-model="editedItem.tipoUsuario" label="Tipo de usuario"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                    <v-btn color="blue darken-1" :disabled="!isFormValid" text @click="save">Guardar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="dialogDelete" persistent
            max-width="350"
            >
            <v-card>
                <v-card-title class="c-red">Eliminar</v-card-title>

                <v-card-text class="v-texto">
                <h4>¿Está seguro(a) de borrar este registro?</h4>
                </v-card-text>

                <v-card-actions class="v-acciones">
                <v-spacer></v-spacer>

                <v-btn
                    color="green darken-1"
                    text
                    @click="deleteEvent"
                >
                    Eliminar
                </v-btn>

                <v-btn
                    color="green darken-1"
                    text
                    @click="closeDeleteModal"
                >
                    Cancelar
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <Alert :tipo="alertType" :mensaje="alertMessage"></Alert>
    </v-container>
</template>

<style>
  .c-red{
    background-color:#970a0acc;
    color:white;
  }
  .v-texto{
    background-color: #8606066e;
    color: white !important;
    padding-top: 10px !important;
    padding-bottom: 6px !important;
  }
  .v-acciones{
    background-color:#970a0acc;
    color: white !important;
  }
  .v-application .green--text.text--darken-1 {
    color: white !important;
    caret-color: white !important;
  }
  .v-btn--contained { margin-left: 65% !important; }
  @media screen and (max-width: 959px) { .v-btn--contained { margin-left: 55% !important; } }
  @media screen and (max-width: 767px) { .v-btn--contained { margin-left: 45% !important; } }
  @media screen and (max-width: 575px) { .v-btn--contained { margin-left: 25% !important; } }
</style>

<script>
    import {mapActions, mapState} from 'vuex';
    import Datatable from '../../components/Datatable';
    import Breadcrumb from '../../components/Breadcrumbs';
    import Alert from '../Alert';
export default {
    name: 'TipoUsuario',
    components: {
        Breadcrumb,
        Datatable,
        Alert
    },
    data: () => ({
        isFormValid: false,
        breadcrumb: [
            {
            text: 'Dashboard',
            disabled: false,
            href: '/',
            },
            {
            text: 'Tipo de usuario',
            disabled: true,
            href: '/',
            }
        ],
        headers: [
            { text: 'ID', align: 'left', value: 'idTipoUsuario'},
            { text: 'Tipo de usuario', value: 'tipoUsuario' },
            { text: 'Acciones', value: 'action', sortable: false }
        ],
        rules: {
            required: value => !!value || 'Requerido.',
        },
    }),
    computed: {
      ...mapState(['tiposUsuarios','dialog', 'editedItem', 'dialogDelete', 
      'alertType', 'alertMessage', 'editedIndex']),
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo registro' : 'Editar registro'
      },
    },
    methods: {
        ...mapActions(['getTiposUsuarios', 'closeModal', 'closeModalDelete', 'crearTipoUsuario', 'editarTipoUsuario', 'eliminarTipoUsuario']),
        save (){
            if(this.editedIndex == -1){
                this.crearTipoUsuario(this.editedItem).then(() => {
                this.getTiposUsuarios();
                });
            }else{
                this.editarTipoUsuario(this.editedItem).then(() => {
                this.getTiposUsuarios();
                })
            }
        },
        close () {
            this.closeModal();
        },
        closeDeleteModal () {
            this.closeModalDelete();
        },
        deleteEvent () {
            this.eliminarTipoUsuario(this.editedItem).then(() => {
            this.getTiposUsuarios();
            });
        },
    },
    created() {
        this.getTiposUsuarios();
    }
}
</script>