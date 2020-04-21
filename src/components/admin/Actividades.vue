<template>
  <v-container fluid>
    <Breadcrumb :items="breadcrumb"></Breadcrumb>
    <Datatable title="Actividades"
    :columnas="headers"
    :datos="actividades"
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
            <v-row>
                <v-col cols="12" sm="12" md="12" v-if="editedIndex === -1">
                    <v-text-field v-model="editedItem.nombreActividad" label="Nombre"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-if="editedIndex != -1">
                    <v-text-field v-model="editedItem.nombreActividad" label="Nombre"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-if="editedIndex != -1">
                  <v-select
                    :items="estados" :value="editedItem.id_estado"
                    label="Estado" v-model="editedItem.id_estado"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-select
                    :items="eventosAct" :value="editedItem.idEvento_fk"
                    label="Evento" v-model="editedItem.idEvento_fk"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-select
                    :items="organizadores" :value="editedItem.text"
                    label="Organizador" v-model="editedItem.idUsuario_fk"
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
                    <!--<v-text-field v-model="editedItem.fechaInicio" label="Fecha de inicio"></v-text-field>-->
                    <v-dialog
                      ref="dialog1"
                      v-model="modal1"
                      :return-value.sync="initDate"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editedItem.fechaInicio"
                          label="Fecha de inicio"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="editedItem.fechaInicio" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="modal1 = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.dialog1.save(initDate)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <!--<v-text-field v-model="editedItem.fechaFin" label="Fecha de fin"></v-text-field>-->
                    <v-dialog
                      ref="dialog2"
                      v-model="modal2"
                      :return-value.sync="endDate"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editedItem.fechaFin"
                          label="Fecha de finalización"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="editedItem.fechaFin" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.dialog2.save(endDate)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
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
            @click="deleteAct"
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
    name: 'Eventos',
    components: {
      Breadcrumb,
      Datatable,
      Alert
    },
    data: () => ({
      initDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      modal1: false,
      modal2: false,
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
        { text: 'ID', align: 'left', value: 'idActividad'},
        { text: 'Actividad', align: 'left', value: 'nombreActividad'},
        { text: 'Evento', value: 'nombreEvento' },
        { text: 'Organizador', value: 'usuario' },
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
      ...mapState(['actividades','dialog', 'editedItem', 'dialogDelete', 'eventosAct', 'estados',
      'alertType', 'alertMessage', 'editedIndex', 'organizadores', 'actividadesCat']),
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo registro' : 'Editar registro'
      },
    },
    methods: {
      ...mapActions(['getActividades', 'getOrganizadores', 'getActividadesCat', 'getEventosAct', 'getEstadosAct',
      'getEventos', 'crearActividad', 'EditarActividad', 'EliminarActividad', 'closeModal', 'closeModalDelete']),
      save (){
        if(this.editedIndex == -1){
          this.crearActividad(this.editedItem).then(() => {
            this.getActividades();
          });
        }else{
          this.EditarActividad(this.editedItem).then(() => {
            this.getActividades();
          })
        }
      },
      deleteAct () {
        this.EliminarActividad(this.editedItem).then(() => {
          this.getActividades();
        });
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
      this.getOrganizadores();
      this.getActividadesCat();
      this.getEventosAct();
      this.getEstadosAct();
    },
  };
</script>