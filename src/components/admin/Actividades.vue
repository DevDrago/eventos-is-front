<template>
<div>
    <div class="datatable-container">
        <mdb-btn color="info" @click.native="modal = true"><i class="fas fa-plus"></i> Agregar</mdb-btn>
		<mdb-btn color="success" @click.native="modal2 = true"><i class="fas fa-plus"></i> Editar</mdb-btn>
		<mdb-btn color="danger" @click.native="modal3 = true"><i class="fas fa-plus"></i> Eliminar</mdb-btn>
        <mdb-datatable :data="data" striped bordered />
    </div>
	<mdb-modal v-if="modal" @close="modal = false">
		<mdb-modal-header>
			<mdb-modal-title tag="h4" class="w-100 text-center font-weight-bold">Agregar actividad</mdb-modal-title>
		</mdb-modal-header>
		<mdb-modal-body>

      <form @submit.prevent="submit">
          <div class="row">
              <div class="col-lg-12"><mdb-input v-model="nombre" required label="Nombre" type="text" class="mb-1"/></div>
              <div class="col-lg-12"><mdb-input v-model="descripcion" required label="Descripción" type="text" class="mb-1"/></div>
              <div class="col-lg-12 mt-3">
                <label>Coordinador</label>
                <select v-model="coordinador" class="browser-default custom-select" required>
                  <option value=""> - Seleccione - </option>
                  <option v-for="coor in coordinadores" :value="coor.idUsuario">{{ coor.coordinador }}</option>
                </select>
              </div>
              <div class="col-lg-12"><mdb-input v-model="nombreEvento" required label="Nombre del evento" type="number" class="mb-1"/></div>
              <div class="col-lg-12 mt-3">
                <label>Categorías</label>
                <select v-model="categorias" class="browser-default custom-select" required>
                  <option value=""> - Seleccione - </option>
                  <option v-for="cat in categorias" :value="cat.idCategoriaActividad">{{ cat.categoriaActividad }}</option>
                </select>
              </div>
              <div class="col-lg-12 mt-3"><mdb-input v-model="fechaInicio" required label="Fecha de inicio" type="date" class="mb-1"/></div>
              <div class="col-lg-12 mt-3"><mdb-input v-model="fechaFin" required label="Fecha de finalización" type="date" class="mb-1"/></div>
              <div class="col-lg-12"><mdb-input v-model="cupos" required label="Cupos" type="number" class="mb-1"/></div>
          </div>
          <div class="row">
              <div class="col-lg-12" v-if="submitStatus === 'ERROR'"><p class="text-danger">Favor llenar el formulario correctamente.</p></div>
              <div class="col-lg-12" v-if="status === 'Error'"><p class="text-danger">{{errMensaje}}</p></div>
              <div class="col-lg-12" v-if="status === 'Cargando'"><p class="text-success">Enviando...</p></div>
          </div>
          <div class="mt-2 text-center">
              <mdb-btn type="submit" color="info">Agregar</mdb-btn>
          </div>
      </form>

    </mdb-modal-body>
	</mdb-modal>

	<mdb-modal v-if="modal2" @close="modal2 = false">
		<mdb-modal-header>
			<mdb-modal-title tag="h4" class="w-100 text-center font-weight-bold">Editar actividad</mdb-modal-title>
		</mdb-modal-header>
		<mdb-modal-body>TODO: Formulario</mdb-modal-body>
		<mdb-modal-footer class="justify-content-center">
			<mdb-btn color="success">Actualizar</mdb-btn>
		</mdb-modal-footer>
	</mdb-modal>

	<mdb-modal v-if="modal3" @close="modal3 = false">
		<mdb-modal-header>
			<mdb-modal-title tag="h4" class="w-100 text-center font-weight-bold">Eliminar actividad</mdb-modal-title>
		</mdb-modal-header>
		<mdb-modal-body>¿Está seguro de querer eliminar el registro seleccionado?</mdb-modal-body>
		<mdb-modal-footer class="justify-content-center">
			<mdb-btn color="danger">Eliminar</mdb-btn>
		</mdb-modal-footer>
	</mdb-modal>
</div>
</template>

<style>
    .datatable-container {
        background: white;
        padding: 2%;
        border-radius: 6px;
    }
</style>

<script>
  import { mdbDatatable, mdbContainer, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn, mdbInput } from 'mdbvue';
  import {mapActions, mapState} from 'vuex';
  import axios from "axios";

  const baseUrl = 'http://localhost:3000/api';

  export default {
	name: 'Actividades',
    components: {
		mdbDatatable,
		mdbContainer,
		mdbModal,
		mdbModalHeader,
		mdbModalTitle,
		mdbModalBody,
		mdbModalFooter,
    mdbBtn,
    mdbInput
    },
    data() {
      return {
        columns: [],
        rows: [],
        modal: false,
        modal2: false,
        modal3: false,

        nombre: '',
        descripcion: '',
        nombreEvento: '',
        fechaInicio: '',
        fechaFin: '',
        cupos: '',
        coordinador: '',

        coordinadores: [],
        categorias: [],

        submitStatus: null,
      };
    },
    created: function () {
        this.getCoordinadores();
        this.getCategorias();
    },
    computed: {
      ...mapState(['status', 'errMensaje']),
      data() {
        return {
          columns: this.columns,
          rows: this.rows
        };
      },
    },
    methods: {
      filterData(dataArr, keys) {
        let data = dataArr.map(entry => {
            let filteredEntry = {};
            keys.forEach(key => {
                if (key.field in entry) {
                    filteredEntry[key.field] = entry[key.field];
                }
            });
            return filteredEntry;
        });
        return data;
      },
      getCoordinadores: function() {
        axios.get(baseUrl+'/usuarios/coordinadores')
        .then(response => {
          //console.log(response.data.coordinadores);
          this.coordinadores = response.data.coordinadores;  
        })
        .catch(error => {console.log(error);});
      },
      getCategorias: function() {
        axios.get(baseUrl+'/actividades/categorias')
        .then(response => {
          //console.log(response.data.coordinadores);
          this.categorias = response.data.categorias;  
        })
        .catch(error => {console.log(error);});
      },
    },
    mounted(){
      axios.get(baseUrl+'/actividades')
        .then(response => {
          //console.log(response.data.actividades);
          let keys = [
                { field: "idActividad", label: "ID"},
                { field: "nombreActividad", label: "Nombre" },
                { field: "descripcion", label: "Descripción" },
                { field: "usuario", label: "Usuario" },
                { field: "nombreEvento", label: "Nombre del evento" },
                { field: "categoriaActividad", label: "Categoría" },
                { field: "fechaInicio", label: "Fecha de inicio" },
                { field: "fechaFin", label: "Fecha de finalización" },
                { field: "numCupos", label: "Cupos" },
            ];
            let entries = this.filterData(response.data.actividades, keys);
            //columns
            this.columns = keys.map(key => {
                //console.log(key);
                return {
                    label: key.label.toUpperCase(),
                    field: key.field,
                    sort: 'asc'
                };
            });
            //rows
            console.log(entries);
            entries.map(entry => this.rows.push(entry));
        })
        .catch(error => {console.log(error);});
    }
  };
</script>