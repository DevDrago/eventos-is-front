<template>
    <v-container fluid>
        <Breadcrumb :items="breadcrumb"></Breadcrumb>
        <Datatable title="Asistencia a actividades"
        :columnas="headers"
        :datos="actividadAsistencia"
        :nuevo=true
        :pdf=true
        :allowDelete=false
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
                    <v-select
                      :items="ActividadesAsis" :value="editedItem.idActividad_fk"
                      label="Actividad" v-model="editedItem.idActividad_fk" :disabled="disabledSelect"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      :items="participantes" :value="editedItem.text"
                      label="Usuario" v-model="editedItem.idUsuario_fk" :disabled="disabledSelect"
                    ></v-select>
                  </v-col>
                  <!--<v-col cols="12" sm="12" md="12">
                    <v-file-input v-model="file" show-size accept=".pdf" chips label="Subir diploma"></v-file-input>
                  </v-col>-->
                  <v-col cols="6" sm="6" md="6">
                    <v-checkbox
                      v-model="editedItem.asistio"
                      :label="'Asistió'" 
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    <v-checkbox v-if="editedItem.asistio === true && this.editedIndex == -1"
                      v-model="generateDiploma"
                      :label="'¿Generar diploma?'" 
                    ></v-checkbox>
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
  name: 'AsistenciaActividad',
  components: {
    Breadcrumb,
    Datatable,
    Alert
  },
  data: () => ({
    file: null,
    generateDiploma: false,
    filseSend: {file: null},
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
      { text: 'Asistio', value: 'asistioText' },
      { text: 'Diploma', value: 'diploma' },
      { text: 'Acciones', value: 'action', sortable: false }
    ],
    }),
    computed: {
      ...mapState(['actividadAsistencia', 'ActividadesAsis', 'participantes', 'dialog', 'editedIndex', 'editedItem', 'alertType', 'alertMessage']),
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo registro' : 'Editar registro'
      },
      disabledSelect () {
        return this.editedIndex === -1 ? false : true
      }
    },
    methods: {
      ...mapActions(['getActividadAsistencia', 'closeModal', 'getActividadesAsis', 'getParticipantes', 'crearActividadAsistencia', 'editarActividadAsistencia']),
      save (){
        if(this.editedIndex == -1){
          this.crearActividadAsistencia([this.editedItem, this.generateDiploma]).then(() => {
            this.getActividadAsistencia();
          });
        }else{ 
          this.editarActividadAsistencia(this.editedItem).then(() => {
            this.getActividadAsistencia();
          })
        }
      },
      close () {
        this.closeModal();
      },
    },
    created() {
      this.getActividadAsistencia();
      this.getActividadesAsis();
      this.getParticipantes();
      
    },
}
</script>

