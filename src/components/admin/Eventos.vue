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
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-on="on"
                  @click="editarEvento = false"
                >Nuevo Evento</v-btn>
              </template>
              <modal-eventos v-model="evento" v-on:cerrar="dialog=false" :esEdicion="editarEvento">
                <!-- <template slot="acciones">
                  
                </template>-->
              </modal-eventos>
            </v-dialog>
          </v-card-title>
          <v-data-table :headers="columns" :items="rows" :search="search">
            <template v-slot:item.action="{ item }">
              <v-btn class="ma-1" tile large color="teal" icon  @click="editar(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn class="ma-1" tile large color="teal" icon  @click="eliminar(item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, State } from "vuex-class";
import { AxiosResponse } from "axios";
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

  @Action("getEventos")
  private getEventos(): any {}

  constructor() {
    super();

    this.keys = [
      { value: "idEvento", text: "ID" },
      { value: "nombreEvento", text: "Nombre" },
      { value: "usuario", text: "Usuario" },
      { value: "fechaInicio", text: "Fecha de inicio" },
      { value: "fechaFin", text: "Fecha de finalización" },
      { text: "Acciones", value: "action", sortable: false }
    ];

    moment.locale("es");
  }

  private filterData(dataArr: Array<EventoDTO>, keys: Array<DataTableHeader>) {
    let data = dataArr.map((entry: EventoDTO) => {
      let filteredEntry: {
        [key: string]: number | string;
      } = {};
      this.keys.forEach((key: DataTableHeader) => {
        if (key.value in entry) {
          filteredEntry[key.value] = entry[key.value];
        }
      });
      return filteredEntry;
    });
    return data;
  }

  mounted() {
    this.obtenerEventos();
    this.editarEvento = true;
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

  private eliminar(item: any) {}
}
</script>