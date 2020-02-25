<template>

<v-container fluid>
    <Breadcrumb :items="breadcrumb"></Breadcrumb>
    <Datatable title="Usuarios"
    :columnas="headers"
    :datos="users"
    :nuevo=false
    ></Datatable>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.numCuentaEmpleado" label="Número de cuenta"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.correo" label="Correo"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.telefono" label="Telefono"></v-text-field>
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
        { text: 'Id', align: 'left', value: 'idUsuario' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Número de cuenta', value: 'numCuentaEmpleado' },
        { text: 'Correo', value: 'correo' },
        { text: 'Teléfono', value: 'telefono' },
        { text: 'Tipo de usuario', value: 'tipoUsuario' },
      ],

    }),
    methods: {
      ...mapActions(['getUsers', 'closeModal']),
      close () {
        this.closeModal();
      },
      save () {
        /*if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()*/
      },
    },
    computed: {
        ...mapState(['users','dialog', 'editedItem']),
        ...mapGetters(['isLoaded']),
        formTitle () {
          return this.editedIndex === -1 ? 'Nuevo registro' : 'Editar registro'
        },
    },
    mounted() {
      this.getUsers();
    },
}
</script>