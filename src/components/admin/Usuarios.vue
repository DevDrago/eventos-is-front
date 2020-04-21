<template>

  <v-container fluid>
      <Breadcrumb :items="breadcrumb"></Breadcrumb>
      <Datatable title="Usuarios"
      :columnas="headers"
      :datos="users"
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
                  <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.nombres" label="Nombres"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.apellidos" label="Apellidos"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.numCuentaEmpleado" label="Número de cuenta/# Empleado"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.correo" label="Correo"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.telefono" label="Telefono"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.idTipoUsuario_fk" label="Tipo de usuario"></v-text-field>
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
  .v-btn--contained { margin-left: 85% !important; }
  @media screen and (max-width: 1400px) { .v-btn--contained { margin-left: 80% !important; } }
  @media screen and (max-width: 959px) { .v-btn--contained { margin-left: 75% !important; } }
  @media screen and (max-width: 767px) { .v-btn--contained { margin-left: 65% !important; } }
  @media screen and (max-width: 575px) { .v-btn--contained { margin-left: 45% !important; } }
</style>

<script>
import Datatable from '../../components/Datatable';
import Breadcrumb from '../../components/Breadcrumbs';
import {mapActions, mapState, mapGetters} from 'vuex';
export default {
    name: 'Usuarios',
    components: {
        Datatable,
        Breadcrumb
    },
    data: () => ({
      editedIndex: -1,
      nuevo: false,
      breadcrumb: [
        {
          text: 'Dashboard',
          disabled: false,
          href: '/',
        },
        {
          text: 'Usuarios',
          disabled: true,
          href: '/',
        }
      ],
      headers: [
        { text: 'ID', align: 'left', value: 'idUsuario' },
        { text: 'Número de cuenta', value: 'numCuentaEmpleado' },
        { text: 'Nombres', value: 'nombres' },
        { text: 'Apellidos', value: 'apellidos' },
        { text: 'Correo', value: 'correo' },
        { text: 'Teléfono', value: 'telefono' },
        { text: 'Tipo de usuario', value: 'tipoUsuario' },
      ],

    }),
    methods: {
      ...mapActions(['getUsers', 'closeModal', 'closeModalDelete',
      'getTiposUsuario', 'crearUsuario', 'editarUsuario', 'eliminarUsuario']),
      
      save () {
        if(this.editedIndex == -1){
          this.crearUsuario(this.editedItem).then(() => {
            this.getUsers();
          });
        }else{
          this.editarUsuario(this.editedItem).then(() => {
            this.getUsers();
          })
        }
      },
      deleteUsuario () {
        this.eliminarUsuario(this.editedItem).then(() => {
          this.getUsers();
        });
      },
      close () {
        this.closeModal();
      },
      closeDeleteModal () {
        this.closeModalDelete();
      },
    },
    computed: {
        ...mapState(['users','dialog', 'editedItem', 'dialogDelete', 
      'tiposUsuario', 'alertType', 'alertMessage', 'editedIndex']),
        ...mapGetters(['isLoaded']),
        formTitle () {
          return this.editedIndex === -1 ? 'Nuevo registro' : 'Editar registro'
        },
    },
    created() {
      this.getUsers();
      this.getTiposUsuario();
    },
}
</script>