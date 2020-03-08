<template>
    <v-container fluid>
        <Breadcrumb :items="breadcrumb"></Breadcrumb>
        <Datatable title="Recursos"
        :columnas="headers"
        :datos="recursos"
        :nuevo=true
        ></Datatable>
        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-select
                                    :items="ActividadesRes" :value="editedItem.idActividad_fk"
                                    label="Actividad" v-model="editedItem.idActividad_fk"
                                ></v-select>
                            </v-col>

                            <v-col cols="12" sm="6" md="6">
                                <v-select
                                    :items="tipRecurso" :value="editedItem.idTipoRecurso_fk"
                                    label="Tipo de recurso" v-model="editedItem.idTipoRecurso_fk"
                                ></v-select>
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
    name: 'Recurso',
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
            text: 'Recurso',
            disabled: true,
            href: '/',
            }
        ],
        headers: [
            { text: 'Actividad', align: 'left', value: 'nombreActividad'},
            { text: 'Tipo de recurso', value: 'tipoRecurso' },
            { text: 'Fecha de registro', value: 'fechaRegistro' },
            { text: 'Acciones', value: 'action', sortable: false }
        ],
    }),
    computed: {
        ...mapState(['ActividadesRes','dialog', 'editedItem', 'dialogDelete', 'estados', 'recursos',
        'alertType', 'alertMessage', 'editedIndex', 'tipRecurso']),
        formTitle () {
            return this.editedIndex === -1 ? 'Nuevo registro' : 'Editar registro'
        },
    },
    methods: {
        ...mapActions(['getRecurso', 'getActividadesRes', 'getTipoRecursoR', 'closeModal', 'closeModalDelete', 'crearRecurso']),
        save (){
            if(this.editedIndex == -1){
                this.crearRecurso(this.editedItem).then(() => {
                this.getRecurso();
                });
            }
        },
        close () {
            this.closeModal();
        },
    },
    created() {
        this.getRecurso();
        this.getActividadesRes();
        this.getTipoRecursoR();
    }
}
</script>