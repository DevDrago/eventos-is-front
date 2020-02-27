<template>
  <v-container fluid>
    <Breadcrumb :items="breadcrumb"></Breadcrumb>
    <Datatable title="Eventos"
    :columnas="headers"
    :datos="eventos"
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
                    <v-text-field v-model="editedItem.nombreEvento" label="Nombre"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-select
                    :items="organizadores" :value="editedItem.idUsuario_fk"
                    label="Usuario" v-model="editedItem.idUsuario_fk"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <!--<v-text-field v-model="editedItem.fechaInicio" label="Fecha de inicio"></v-text-field>-->
                    <v-menu
                      v-model="fechaInicio"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editedItem.fechaInicio"
                          label="Fecha de inicio"
                          prepend-icon="event"
                          hint="MM/DD/YYYY format"
                          @blur="fechaInicio = parseDate(dateFormatted)"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="editedItem.fechaInicio" @input="fechaInicio = false"></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.fechaFin" label="Fecha de fin"></v-text-field>
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
    name: 'Eventos',
    components: {
      Breadcrumb,
      Datatable,
      Alert
    },
    data: (wm) => ({
      fechaInicio: new Date().toISOString().substr(0, 10),
      dateFormatted: wm.formatDate(new Date().toISOString().substr(0, 10)),
      editedIndex: -1,
      breadcrumb: [
        {
          text: 'Dashboard',
          disabled: false,
          href: '/',
        },
        {
          text: 'Eventos',
          disabled: true,
          href: '/',
        }
      ],
      headers: [
        { text: 'id', align: 'left', value: 'idEvento'},
        { text: 'Evento', value: 'nombreEvento' },
        { text: 'Usuario', value: 'usuario' },
        { text: 'Fecha de inicio', value: 'fechaInicio' },
        { text: 'Fecha de finalización', value: 'fechaFin' },
        { text: 'Acciones', value: 'action', sortable: false }
      ],
      
    }),
    computed: {
      ...mapState(['eventos','dialog', 'editedItem', 'dialogDelete', 
      'organizadores', 'alertType', 'alertMessage', 'editedIndex']),
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo registro' : 'Editar registro'
      },
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },
    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      },
    },
    methods: {
      save () {
        if(this.editedIndex == -1){
          this.crearEvento(this.editedItem).then(() => {
            this.getEventos();
          });
        }else{
          this.EditarEvento(this.editedItem).then(() => {
            this.getEventos();
          })
        }
      },
      deleteEvent () {
        this.EliminarEvento(this.editedItem).then(() => {
          this.getEventos();
        });
      },
      ...mapActions(['getEventos', 'closeModal', 'closeModalDelete',
      'getOrganizadores', 'crearEvento', 'EditarEvento', 'EliminarEvento']),
      close () {
        this.closeModal();
      },
      closeDeleteModal () {
        this.closeModalDelete();
      },
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [day, month, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
    },
    created() {
      this.getEventos();
      this.getOrganizadores();
    },
  }
</script>