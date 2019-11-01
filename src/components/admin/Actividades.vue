<template>
  <div>
    <div class="datatable-container">
      <transition name="fade">
        <div
          style="display:none;"
          :class="['alert', fondoalert, 'alert-dismissible']"
          v-show="mostrarMensaje"
        >
          <button type="button" class="close" @click.prevent="ocultarMensaje" aria-hidden="true">×</button>
          <h4 class="mensaje">
            <i :class="['icon', 'fas', icono]"></i>
            @{{mensaje}}
          </h4>
        </div>
      </transition>

      <mdb-btn color="info" @click.native="modal = true">
        <i class="fas fa-plus"></i> Agregar
      </mdb-btn>
      <mdb-btn color="success" @click.native="modal2 = true">
        <i class="fas fa-plus"></i> Editar
      </mdb-btn>
      <mdb-btn color="danger" @click.native="modal3 = true">
        <i class="fas fa-plus"></i> Eliminar
      </mdb-btn>
      <mdb-datatable :data="data" striped bordered :key="reloadDatatable" />
    </div>

    <mdb-modal v-if="modal" @close="modal = false">
      <mdb-modal-header>
        <mdb-modal-title tag="h4" class="w-100 text-center font-weight-bold">Agregar actividad</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <form @submit.prevent="crear">
          <div class="row">
            <div class="col-lg-12">
              <mdb-input v-model="nombre" required label="Nombre" type="text" class="mb-1" />
            </div>
            <div class="col-lg-12">
              <mdb-input
                v-model="descripcion"
                required
                label="Descripción"
                type="text"
                class="mb-1"
              />
            </div>
            <div class="col-lg-12 mt-3">
              <label>Coordinador</label>
              <select v-model="coordinador" class="browser-default custom-select" required>
                <option value>- Seleccione -</option>
                <option
                  v-for="coor in coordinadores"
                  :value="coor.idUsuario"
                  :key="coor.idUsuario"
                >{{ coor.coordinador }}</option>
              </select>
            </div>
            <div class="col-lg-12 mt-3">
              <label>Evento</label>
              <select v-model="evento" class="browser-default custom-select" required>
                <option value>- Seleccione -</option>
                <option
                  v-for="eve in eventos"
                  :value="eve.idEvento"
                  :key="eve.idEvento"
                >{{ eve.nombreEvento }}</option>
              </select>
            </div>
            <div class="col-lg-12 mt-3">
              <label>Categorías</label>
              <select v-model="categoria" class="browser-default custom-select" required>
                <option value>- Seleccione -</option>
                <option
                  v-for="cat in actividadesCat"
                  :value="cat.idCategoriaActividad"
                  :key="cat.idCategoriaActividad"
                >{{ cat.categoriaActividad }}</option>
              </select>
            </div>
            <div class="col-lg-12 mt-3">
              <mdb-input
                v-model="fechaInicio"
                required
                label="Fecha de inicio"
                type="date"
                class="mb-1"
              />
            </div>
            <div class="col-lg-12 mt-3">
              <mdb-input
                v-model="fechaFin"
                required
                label="Fecha de finalización"
                type="date"
                class="mb-1"
              />
            </div>
            <div class="col-lg-12">
              <mdb-input v-model="cupos" required label="Cupos" type="number" class="mb-1" />
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12" v-if="submitStatus === 'ERROR'">
              <p class="text-danger">Favor llenar el formulario correctamente.</p>
            </div>
            <div class="col-lg-12" v-if="status === 'Error'">
              <p class="text-danger">{{errMensaje}}</p>
            </div>
            <div class="col-lg-12" v-if="status === 'Cargando'">
              <p class="text-success">Enviando...</p>
            </div>
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
import {
  mdbDatatable,
  mdbContainer,
  mdbModal,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbBtn,
  mdbInput
} from "mdbvue";
import { mapActions, mapState } from "vuex";
import axios from "axios";
import moment from "moment";

const baseUrl = "http://localhost:3000/api";

export default {
  name: "Actividades",
  components: {
    mdbDatatable,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbBtn,
    mdbInput
  },
  created: function() {},
  data() {
    return {
      columns: [],
      rows: [],
      modal: false,
      modal2: false,
      modal3: false,

      coordinadores: [],
      actividadesCat: [],
      eventos: [],

      submitStatus: null,
      reloadDatatable: 0,

      mostrarMensaje: false,
      mensaje: "",
      fondoalert: "alert-success",
      icono: "fa-check",

      //Al crear
      nombre: "",
      descripcion: "",
      evento: "",
      fechaInicio: "",
      fechaFin: "",
      cupos: "",
      coordinador: "",
      categoria: ""
    };
  },
  computed: {
    ...mapState(["status", "errMensaje"]),
    data() {
      return {
        columns: this.columns,
        rows: this.rows
      };
    }
  },
  methods: {
    ...mapActions([
      "getActividades",
      "getCoordinadores",
      "getActividadesCat",
      "getEventos",
      "crearActividad"
    ]),
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
    crear() {
      this.crearActividad({
        nombreActividad: this.nombre,
        descripcion: this.descripcion,
        evento: this.evento,
        fechaInicio: moment(this.fechaInicio).format("DD-MM-YYYY"),
        fechaFin: moment(this.fechaFin).format("DD-MM-YYYY"),
        cupos: this.cupos,
        usuario: this.coordinador,
        categoria: this.categoria
      })
        .then(response => {
          this.mensaje = response.data.mensaje;
          this.mostrarRespuesta(this.mensaje, 0);
          this.habilitar = false;
          this.modal = false;
        })
        .catch(error => {
          if (error) {
            this.mensaje = error.response.data.mensaje;
            this.mostrarRespuesta(this.mensaje, 2);
            this.habilitar = false;
          }
        });
    },
    mostrarRespuesta: function(respuesta, tipo) {
      this.fondoalert =
        tipo == 0 ? "alert-success" : tipo == 1 ? "alert-info" : "alert-danger";
      this.icono =
        tipo == 0
          ? "fa-check-circle"
          : tipo == 1
          ? "fa-info-circle"
          : "fa-exclamation-triangle";
      this.mensaje = respuesta;
      this.mostrarMensaje = true;
      setTimeout(
        function() {
          this.ocultarMensaje();
        }.bind(this),
        5000
      );
      if (tipo == 0) {
        this.limpiar();
        this.reload();
      }
    },
    ocultarMensaje: function() {
      this.mostrarMensaje = false;
    },
    limpiar: function() {
      this.nombre = "";
      this.descripcion = "";
      this.evento = "";
      this.fechaInicio = "";
      this.fechaFin = "";
      this.cupos = "";
      this.coordinador = "";
      this.categoria = "";
    },
    reload: function() {
      this.reloadDatatable += 1;
    }
  },
  mounted() {
    this.getActividades()
      .then(response => {
        console.log(response.data.actividades);
        let keys = [
          { field: "idActividad", label: "ID" },
          { field: "nombreActividad", label: "Nombre" },
          { field: "descripcion", label: "Descripción" },
          { field: "usuario", label: "Usuario" },
          { field: "nombreEvento", label: "Nombre del evento" },
          { field: "categoriaActividad", label: "Categoría" },
          { field: "fechaInicio", label: "Fecha de inicio" },
          { field: "fechaFin", label: "Fecha de finalización" },
          { field: "noCupos", label: "Cupos" }
        ];
        let entries = this.filterData(response.data.actividades, keys);
        //columns
        this.columns = keys.map(key => {
          //console.log(key);
          return {
            label: key.label.toUpperCase(),
            field: key.field,
            sort: "asc"
          };
        });
        //rows
        //console.log(entries);
        entries.map(entry => this.rows.push(entry));
      })
      .catch(error => {
        console.log(error);
      });

    this.getCoordinadores()
      .then(response => {
        this.coordinadores = response.data.coordinadores;
      })
      .catch(error => {
        console.log(error);
      });

    this.getActividadesCat()
      .then(response => {
        //console.log(response.data.categorias);
        this.actividadesCat = response.data.categorias;
      })
      .catch(error => {
        console.log(error);
      });

    this.getEventos()
      .then(response => {
        //console.log(response.data.categorias);
        this.eventos = response.data.eventos;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>