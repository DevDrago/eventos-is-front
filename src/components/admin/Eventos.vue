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
                    <v-text-field v-model="editedItem.usuario" label="Usuario"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.fechaInicio" label="Fecha de inicio"></v-text-field>
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
   
</v-container>
</template>

<script>
  import {mapActions, mapState} from 'vuex';
  import Datatable from '../../components/Datatable';
  import Breadcrumb from '../../components/Breadcrumbs';

  export default {
    name: 'Eventos',
    components: {
      Breadcrumb,
      Datatable
    },
    data: () => ({
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
      ...mapState(['eventos','dialog', 'editedItem']),
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo registro' : 'Editar registro'
      },
    },
    methods: {
      save () {

      },
      ...mapActions(['getEventos', 'closeModal']),
      close () {
        this.closeModal();
      },
    },
    created() {
      this.getEventos();
    },
  }
</script>