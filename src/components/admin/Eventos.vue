<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Eventos
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px" v-if="isAdmin">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on" @click="editarEvento = false">
                  Nuevo Evento
                </v-btn>
              </template>
              <modal-eventos v-model="evento" v-on:cerrar="dialog=false" :esEdicion="editarEvento">
                <!-- <template slot="acciones">
                  
                </template>-->
              </modal-eventos>
            </v-dialog>
          </v-card-title>
          <v-data-table :headers="columns" :items="rows" :search="search">
            <template v-slot:item.action="{ item }" v-if="isAdmin">
              <v-btn class="ma-1" tile large color="teal" icon @click="editar(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn class="ma-1" tile large color="teal" icon @click="eliminar(item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" vertical>
      {{ mensaje }}
      <v-btn color="indigo" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Action, State, Getter } from "vuex-class";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { DataTableHeader } from "@/interfaces/VuetifyComponents";
import { EventoDTO } from "@/interfaces/Eventos";
import ModalEventos from "@/components/admin/eventos/ModalEventos.vue";
import moment from "moment";

@Component({
  name: "eventos",
  components: {
    ModalEventos
  }
})
export default class Eventos extends Vue {
  private columns: Array<DataTableHeader> = [];
  private rows: Array<EventoDTO> = [];
  private search = "";
  private modal = false;
  private modal2 = false;
  private modal3 = false;
  private keys: Array<DataTableHeader>;
  private dialog = false;
  private evento = {};
  private editarEvento = true;
  private snackbar = false;
  private mensaje = "";

  @Getter("isAdmin") private isAdmin!: any;

  @Action("getEventos")
  private getEventos(): any {}

  constructor() {
    super();

    this.keys = [
      { value: "idEvento", text: "ID" },
      { value: "nombreEvento", text: "Nombre" },
      { value: "usuario", text: "Usuario" },
      { value: "fechaInicio", text: "Fecha de inicio" },
      { value: "fechaFin", text: "Fecha de finalización" }
    ];
    moment.locale("es");
  }

  private filterData(dataArr: Array<EventoDTO>, keys: Array<DataTableHeader>) {
    let data = dataArr.map((entry: EventoDTO) => {
      let filteredEntry = {};
      this.keys.forEach((key: DataTableHeader) => {
        if (key.value in entry) {
          filteredEntry = entry;
        }
      });
      return filteredEntry;
    });
    return data;
  }

  mounted() {
    if (this.isAdmin) {
      this.keys.push({ text: "Acciones", value: "action", sortable: false });
    }
    this.obtenerEventos();
    this.editarEvento = true;
  }

  @Watch("evento")
  private actualizarTabla(){
    if(!this.editarEvento){
      //this.rows.push(this.evento);
      
    }
  }

  private async obtenerEventos() {
    try {
      let eventos = await this.getEventos();

      if (eventos.data !== undefined) {
        let entries = this.filterData(eventos.data.eventos, this.keys);
        //columns
        this.columns = this.keys.map(key => {
          //console.log(key);
          return {
            text: key.text.toUpperCase(),
            value: key.value,
            sort: "asc"
          };
        });

        //rows
        entries.map((entry: any) => {
          this.rows.push(entry);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  private editar(item: EventoDTO) {
    this.editarEvento = true;
    this.evento = Object.assign({}, item);
    this.dialog = true;
  }

  private async eliminar(item: EventoDTO) {
    let config: AxiosRequestConfig = {
      headers: { "content-type": "application/json" },
      withCredentials: true,
      data: item
    };
    let res = await axios.delete("/eventos/eliminar", config);
    this.mensajes("actualizado", "actualizar", res.status === 200, item);
  }

  private mensajes(msgC: string, msgE: string, ok: boolean, evento: EventoDTO) {
    if (ok) {
      this.mensaje = `Se ha ${msgC} correctamente el evento ${evento.nombreEvento}`;
      this.snackbar = true;
    } else {
      this.mensaje = `No se pudo ${msgC} el evento ${evento.nombreEvento}`;
      this.snackbar = true;
    }
  }

}
</script>