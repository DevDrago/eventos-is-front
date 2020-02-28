<template>
  <v-container fluid>
    <Breadcrumb :items="breadcrumb"></Breadcrumb>
    <Datatable title="Actividades"
    :columnas="headers"
    :datos="actividades"
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
                <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="editedItem.nombreActividad" label="Nombre"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-select
                    :items="eventosAct" :value="editedItem.idEvento_fk"
                    label="Evento" v-model="editedItem.idEvento_fk"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-select
                    :items="coordinadores" :value="editedItem.idUsuario_fk"
                    label="Usuario" v-model="editedItem.idUsuario_fk"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-select
                    :items="actividadesCat" :value="editedItem.idCategoriaActividad_fk"
                    label="Categoría" v-model="editedItem.idCategoriaActividad_fk"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field min="0" type="number" v-model="editedItem.noCupos" label="Cupos"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.fechaInicio" label="Fecha de inicio"></v-text-field>

                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.fechaFin" label="Fecha de fin"></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-textarea
                    outlined
                    v-model="editedItem.descripcion"
                    label="Descripción"
                    value="editedItem.descripcion"
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
    name: 'Eventos',
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
          text: 'Actividades',
          disabled: true,
          href: '/',
        }
      ],
      headers: [
        { text: 'id', align: 'left', value: 'idActividad'},
        { text: 'Actividad', align: 'left', value: 'nombreActividad'},
        { text: 'Evento', value: 'nombreEvento' },
        { text: 'Usuario', value: 'usuario' },
        { text: 'Categoría', align: 'left', value: 'categoriaActividad'},
        { text: 'Fecha de inicio', value: 'fechaInicio' },
        { text: 'Fecha de finalización', value: 'fechaFin' },
        { text: 'Descripción', value: 'descripcion' },
        { text: 'Cupos', value: 'noCupos' },
        { text: 'Estado', value: 'estado' },
        { text: 'Acciones', value: 'action', sortable: false }
      ],
    }),
    computed: {
      ...mapState(['actividades','dialog', 'editedItem', 'dialogDelete', 'eventosAct',
      'alertType', 'alertMessage', 'editedIndex', 'coordinadores', 'actividadesCat']),
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo registro' : 'Editar registro'
      },
    },
    methods: {
      ...mapActions(['getActividades', 'getCoordinadores', 'getActividadesCat', 'getEventosAct',
      'getEventos', 'crearActividad', 'closeModal', 'closeModalDelete']),
      save (){
        if(this.editedIndex == -1){
          this.crearActividad(this.editedItem).then(() => {
            this.getActividades();
          });
        }else{
          /*this.EditarEvento(this.editedItem).then(() => {
            this.getEventos();
          })*/
        }
      },
      close () {
        this.closeModal();
      },
      closeDeleteModal () {
        this.closeModalDelete();
      },
    },
    created() {
      this.getActividades();
      this.getCoordinadores();
      this.getActividadesCat();
      this.getEventosAct();
    },
  };
</script>