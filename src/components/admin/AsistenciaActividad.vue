<template>
    <v-container fluid>
        <Breadcrumb :items="breadcrumb"></Breadcrumb>
        <Datatable title="Asistencia a actividades"
        :columnas="headers"
        :datos="actividadAsistencia"
        :nuevo=true
        ></Datatable>
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
  name: 'AsistenciaActividad',
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
        text: 'Asistencia a actividades',
        disabled: true,
        href: '/',
      }
    ],
    headers: [
      { text: 'Actividad', align: 'left', value: 'nombreActividad'},
      { text: 'Usuario', value: 'usuario' },
      { text: 'Asistio', value: 'asistio' },
      { text: 'Diploma', value: 'rutaDiploma' },
      { text: 'Acciones', value: 'action', sortable: false }
    ],
    }),
    computed: {
      ...mapState(['actividadAsistencia','dialog', 'editedIndex', 'editedItem']),
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo registro' : 'Editar registro'
      },
    },
    methods: {
      ...mapActions(['getActividadAsistencia', 'closeModal']),
      /*save (){
        if(this.editedIndex == -1){
          this.crearActividad(this.editedItem).then(() => {
            this.getActividadAsistencia();
          });
        }else{
          this.EditarActividad(this.editedItem).then(() => {
            this.getActividadAsistencia();
          })
        }
      },*/
      close () {
        this.closeModal();
      }
    },
    created() {
      this.getActividadAsistencia();
      
    },
}
</script>

