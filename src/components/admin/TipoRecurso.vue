<template>
    <v-container fluid>
        <Breadcrumb :items="breadcrumb"></Breadcrumb>
        <Datatable title="Tipos de recurso"
        :columnas="headers"
        :datos="tiposRecurso"
        :nuevo=true
        :allowDelete=true
        ></Datatable>
        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field type="text" v-model="editedItem.tipoRecurso" label="Tipo de recurso"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="dialogDelete"
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
        <Alert :tipo="alertType"
        :mensaje="alertMessage"></Alert>
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
</style>

<script>
    import {mapActions, mapState} from 'vuex';
    import Datatable from '../../components/Datatable';
    import Breadcrumb from '../../components/Breadcrumbs';
    import Alert from '../Alert';
export default {
    name: 'TipoRecurso',
    components: {
    Breadcrumb,
    Datatable,
    Alert
    },
    data: () => ({
        breadcrumb: [
            {
            text: 'Dashboard',
            disabled: false,
            href: '/',
            },
            {
            text: 'Tipo de recurso',
            disabled: true,
            href: '/',
            }
        ],
        headers: [
            { text: 'id', align: 'left', value: 'idTipoRecurso'},
            { text: 'Tipo de recurso', value: 'tipoRecurso' },
            { text: 'Acciones', value: 'action', sortable: false }
        ],
    }),
    computed: {
      ...mapState(['tiposRecurso','dialog', 'editedItem', 'dialogDelete', 
      'alertType', 'alertMessage', 'editedIndex']),
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo registro' : 'Editar registro'
      },
    },
    methods: {
        ...mapActions(['getTiposRecurso', 'closeModal', 'closeModalDelete', 'crearTipoRecurso', 'editarTipoRecurso', 'eliminarTipoRecurso']),
        save (){
            if(this.editedIndex == -1){
                this.crearTipoRecurso(this.editedItem).then(() => {
                this.getTiposRecurso();
                });
            }else{
                this.editarTipoRecurso(this.editedItem).then(() => {
                this.getTiposRecurso();
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
            this.eliminarTipoRecurso(this.editedItem).then(() => {
            this.getTiposRecurso();
            });
        },
    },
    created() {
        this.getTiposRecurso();
    }
}
</script>