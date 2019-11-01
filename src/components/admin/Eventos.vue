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
		<mdb-modal-body>TODO: Formulario</mdb-modal-body>
		<mdb-modal-footer class="justify-content-center">
			<mdb-btn color="info">Agregar</mdb-btn>
		</mdb-modal-footer>
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
  import { mdbDatatable, mdbContainer, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn } from 'mdbvue';
  import {mapActions, mapState} from 'vuex';

  export default {
    name: 'Eventos',
    components: {
		mdbDatatable,
		mdbModal,
		mdbModalHeader,
		mdbModalTitle,
		mdbModalBody,
		mdbModalFooter,
		mdbBtn
    },
    data() {
		return {
			columns: [],
			rows: [],
			modal: false,
			modal2: false,
			modal3: false,
		};
    },
    computed: {
      data() {
        return {
          columns: this.columns,
          rows: this.rows
        };
      },
    },
    methods: {
      ...mapActions(['getEventos']),
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
      }
    },
    mounted(){
        this.getEventos()
            .then((response) => {
                let keys = [
                { field: "idEvento", label: "ID"},
                { field: "nombreEvento", label: "Nombre" },
                { field: "usuario", label: "Usuario" },
                { field: "fechaInicio", label: "Fecha de inicio" },
                { field: "fechaFin", label: "Fecha de finalización" },
                ];
                let entries = this.filterData(response.data.eventos, keys);
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
                entries.map(entry => this.rows.push(entry));
            })
            .catch(err => console.log(err));
    }
  }
</script>