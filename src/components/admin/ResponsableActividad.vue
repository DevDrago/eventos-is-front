<template>
    <v-container fluid>
        <Breadcrumb :items="breadcrumb"></Breadcrumb>
        <Datatable title="Responsable"
        :columnas="headers"
        :datos="actResponsables"
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
                            <v-col cols="12" sm="6" md="6" v-if="editedIndex == -1">
                                <v-select
                                    :items="ActividadesRes" :value="editedItem.idActividad_fk"
                                    label="Actividad" v-model="editedItem.idActividad_fk"
                                ></v-select>
                            </v-col>

                            <v-col cols="12" sm="6" md="6" v-if="editedIndex == -1">
                                <v-select
                                    :items="apoyosC" :value="editedItem.text"
                                    label="Usuario" v-model="editedItem.idUsuario_fk"
                                ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field min="0" type="number" v-model="editedItem.totalHoras" label="Total de horas"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" v-if="editedIndex != -1">
                                <v-select
                                    :items="estados" :value="editedItem.id_estado"
                                    label="Estado" v-model="editedItem.id_estado"
                                ></v-select>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-textarea
                                    outlined
                                    v-model="editedItem.trabajoRealizado"
                                    label="Trabajo realizado"
                                    value="editedItem.trabajoRealizado"
                                ></v-textarea>
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
        name: 'ResponsableActividad',
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
                text: 'Responsable de actividad',
                disabled: true,
                href: '/',
                }
            ],
            headers: [
                { text: 'Actividad', align: 'left', value: 'nombreActividad'},
                { text: 'Nombre', value: 'nombres' },
                { text: 'Trabajo realizado', value: 'trabajoRealizado'},
                { text: 'Total horas', value: 'totalHoras' },
                { text: 'Estado', value: 'estado' },
                { text: 'Fecha de registro', value: 'fechaRegistro' },
                { text: 'Acciones', value: 'action', sortable: false }
            ],
        }),
        computed: {
            ...mapState(['actResponsables','dialog', 'editedItem', 'dialogDelete', 'estados', 'apoyosC',
            'alertType', 'alertMessage', 'editedIndex', 'ActividadesRes']),
            formTitle () {
                return this.editedIndex === -1 ? 'Nuevo registro' : 'Editar registro'
            },
        },
        methods: {
            ...mapActions(['getActResponsables', 'getEstadosAct', 'getApoyosCoordinadores', 'getActividadesRes',
            'closeModal', 'closeModalDelete', 'crearActividadesRes', 'editarActividadesRes', 'eliminarActividadesRes']),
            save (){
                if(this.editedIndex == -1){
                    this.crearActividadesRes(this.editedItem).then(() => {
                    this.getActResponsables();
                    });
                }else{
                    this.editarActividadesRes(this.editedItem).then(() => {
                    this.getActResponsables();
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
                this.eliminarActividadesRes(this.editedItem).then(() => {
                this.getActResponsables();
                });
            },
        },
        created() {
            this.getActResponsables();
            this.getEstadosAct();
            this.getApoyosCoordinadores();
            this.getActividadesRes();
        }
    }
</script>