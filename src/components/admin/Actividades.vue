<template>
<div>
    <transition name="fade">
        <div style="display:none;" :class="['alert', fondoalert, 'alert-dismissible']" v-show="mostrarMensaje">
            <button type="button" class="close" @click.prevent="ocultarMensaje" aria-hidden="true">×</button>
            <h4 class="mensaje">
                <i :class="['icon', 'fas', icono]"></i>
                @{{mensaje}}
            </h4>
        </div>
    </transition>
    <v-data-table :headers="columns" :items="rows" :search="search" sort-by="idActividad" class="elevation-1">
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>Manejo de Actividades</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-text-field append-icon="mdi-magnify" label="Buscar" single-line hide-details v-model="search"></v-text-field>
                <v-spacer></v-spacer>
                
                <v-dialog v-model="dialog" max-width="500px" max-height="100%">
                    <template v-slot:activator="{ on }">
                        <!--<v-btn color="red lighten-1" dark class="mb-2 mr-2" v-on="on">Eliminar</v-btn>
                        <v-btn color="teal lighten-1" dark class="mb-2 mr-2" v-on="on">Editar</v-btn>-->
                        <v-btn color="light-blue darken-1" dark class="mb-2 mr-2" v-on="on">Crear</v-btn>
                    </template>
                    <!-- Modal Crear/Editar -->
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="editedItem.nombreActividad" label="Nombre" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="editedItem.descripcion" label="Descripción" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-select v-model="editedItem.coordinador" label="Coordinador" :items="coordinadores" item-text="coordinador" required></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-select v-model="editedItem.nombreEvento" label="Evento" :items="eventos" item-text="nombreEvento" required></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-select v-model="editedItem.categoriaActividad" label="Categoría" :items="actividadesCat" item-text="categoriaActividad" required></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-date-picker v-model="date" no-title scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                        </v-date-picker>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">Cerrar</v-btn>
                        <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.accion="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
        <!--<v-btn color="primary" @click="initialize">Reset</v-btn>-->
        </template>
    </v-data-table>
</div>
</template>


<script>
    import { mapActions, mapState } from "vuex";
    import axios from "axios";
    import moment from "moment";

    const baseUrl = "http://localhost:3000/api";

    export default {
        name: "Actividades",
        data: () => ({
            columns: [],
            rows: [],
            search: '',
            date: new Date().toISOString().substr(0, 10),
            menu: false,

            coordinadores: [],
            actividadesCat: [],
            eventos: [],

            submitStatus: null,
            //reloadDatatable: 0,

            mostrarMensaje: false,
            mensaje: "",
            fondoalert: "alert-success",
            icono: "fa-check",

            dialog: false,
            editedIndex: -1,
            editedItem: {
                nombre: '',
                descripcion: '',
                evento: '',
                fechaInicio: '',
                fechaFin: '',
                cupos: '',
                coordinador: '',
                categoria: ''
            },
            defaultItem: {
                nombre: '',
                descripcion: '',
                evento: '',
                fechaInicio: '',
                fechaFin: '',
                cupos: '',
                coordinador: '',
                categoria: ''
            },
        }),

        computed: {
            ...mapState(["status", "errMensaje"]),
            formTitle () {
                return this.editedIndex === -1 ? 'Agregar actividad' : 'Editar Actividad'
            },
            data() {
                return {
                    columns: this.columns,
                    rows: this.rows
                };
            }
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
        },

        created () {
            //this.initialize()
        },

        methods: {
            ...mapActions([
                "getActividades",
                "getCoordinadores",
                "getActividadesCat",
                "getEventos",
                "crearActividad"
            ]),
            showAlert(a){
                if (event.target.classList.contains('btn__content')) return;
                alert('Alert! \n' + a.name);
            },
            filterData(dataArr, keys) {
                let data = dataArr.map(entry => {
                    let filteredEntry = {};
                    keys.forEach(key => {
                        if (key.value in entry) {
                            filteredEntry[key.value] = entry[key.value];
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
                this.fondoalert = tipo == 0 ? "alert-success" : tipo == 1 ? "alert-info" : "alert-danger";
                this.icono = tipo == 0 ? "fa-check-circle" : tipo == 1 ? "fa-info-circle" : "fa-exclamation-triangle";
                this.mensaje = respuesta;
                this.mostrarMensaje = true;
                setTimeout(
                    function() {
                        this.ocultarMensaje();
                    }.bind(this), 5000
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
            },

            editItem (item) {
                this.editedIndex = this.rows.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem (item) {
                const index = this.rows.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
            },

            close () {
                this.dialog = false
                setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                }, 300)
            },

            //Editar el contenido para manejarlo con axios
            save () {
                if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
                } else {
                this.desserts.push(this.editedItem)
                }
                this.close()
            },
        },

        mounted() {
            this.getActividades()
            .then(response => {
                //console.log(response.data.actividades);
                let keys = [
                    { value: "idActividad", text: "ID" },
                    { value: "nombreActividad", text: "Nombre" },
                    { value: "descripcion", text: "Descripción" },
                    { value: "usuario", text: "Coordinador" },
                    { value: "nombreEvento", text: "Nombre del evento" },
                    { value: "categoriaActividad", text: "Categoría" },
                    { value: "fechaInicio", text: "Fecha de inicio" },
                    { value: "fechaFin", text: "Fecha de finalización" },
                    { value: "noCupos", text: "Cupos" },
                    { value: 'accion', text: 'Acciones' },
                ];
                let entries = this.filterData(response.data.actividades, keys);
                //columns
                this.columns = keys.map(key => {
                    //console.log(key);
                    return {
                        text: key.text.toUpperCase(),
                        value: key.value
                    };
                });
                //rows
                //console.log(this.columns);
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
    }
</script>