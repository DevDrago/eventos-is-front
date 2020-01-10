<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ titulo }}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="eventoEditado.nombreEvento" label="Nombre del Evento"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="eventoEditado.usuario" label="Usuario" readonly></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-menu
              v-model="fechaInicio"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field v-model="fechaInicioF" label="Fecha de Inicio" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="eventoEditado.fechaInicio" @input="fechaInicio = false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12">
            <v-menu
              v-model="fechaFin"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field v-model="fechaFinF" label="Fecha de Finalizacion" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="eventoEditado.fechaFin" @input="fechaFin = false"></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <!-- <slot name="acciones"></slot> -->
      <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
      <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
    </v-card-actions>
    <v-snackbar v-model="snackbar" vertical>
      {{ mensaje }}
      <v-btn color="indigo" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { EventoDTO } from "@/interfaces/Eventos";
import { Getter } from "vuex-class";
import axios from "axios";
import moment from "moment";

@Component({
  name: "modal-eventos"
})
export default class ModalEventos extends Vue {
  @Prop() private value!: EventoDTO;
  @Prop() private esEdicion!: string;
  @Getter("usuario") private usuario!: any;
  private titulo = "Nuevo Evento";
  private eventoEditado: EventoDTO;
  private fechaInicio = false;
  private fechaFin = false;
  private snackbar = false;
  private mensaje = "";
  private nombreUsuario = "";
  private $baseUrl = "http://localhost:3000/api";
  
  constructor() {
    super();
    this.eventoEditado = this.resetEventoEditado();
  }

  mounted() {
    this.edicion();
    //this.usuario = JSON.stringify(this.gusuario);
  }
  @Watch("esEdicion")
  private edicion() {
    if (this.esEdicion) {
      this.titulo = "Editar Evento";
      this.eventoEditado = this.value;
      this.eventoEditado.fechaInicio = moment(this.eventoEditado.fechaInicio).format('YYYY-MM-DD');
    this.eventoEditado.fechaFin = moment(this.eventoEditado.fechaFin).format('YYYY-MM-DD');
    } else {
      this.titulo = "Nuevo Evento";
      this.eventoEditado = this.resetEventoEditado();
      this.eventoEditado.usuario =  this.usuario.nombres + " " + this.usuario.apellidos;
    }
  }

  private resetEventoEditado(): EventoDTO {
    return {
      idEvento: 0,
      nombreEvento: "",
      fechaInicio: "",
      fechaFin: "",
      usuario: ""
    };
  }

  private get fechaInicioF() {
    return this.eventoEditado.fechaInicio
      ? moment(this.eventoEditado.fechaInicio).format("dddd, LL")
      : "";
  }

  private get fechaFinF() {
    return this.eventoEditado.fechaFin
      ? moment(this.eventoEditado.fechaFin).format("dddd, LL")
      : "";
  }

  private close() {
    this.eventoEditado = Object.assign({}, this.resetEventoEditado());
    this.$emit("cerrar");
  }

  private save() {
    this.eventoEditado.fechaInicio = moment(this.eventoEditado.fechaInicio).format('DD-MM-YYYY');
    this.eventoEditado.fechaFinal = moment(this.eventoEditado.fechaFin).format('DD-MM-YYYY');
    if (this.esEdicion) {
      this.actualizar();
    } else {
      this.guardar();
    }
    this.$emit("input", this.eventoEditado);
    this.close();
  }

  private async guardar() {
    let res = await axios.post(this.$baseUrl+"/eventos/crear", this.eventoEditado, {
      headers: { "content-type": "application/json" },
      withCredentials: true
    });
    this.mensajes("creado", "crear", res.status === 200);
  }

  private async actualizar() {
    let res = await axios.put("/eventos/actualizar", this.eventoEditado, {
      headers: { "content-type": "application/json" },
      withCredentials: true
    });
    this.mensajes("actualizado", "actualizar", res.status == 200);
  }

  private mensajes(msgC: string, msgE: string, ok: boolean) {
    console.log(ok)
    if (ok) {
      this.mensaje =
        `Se ha ${msgC} correctamente el evento ${this.eventoEditado.nombreEvento}`;
      this.snackbar = true;
    } else {
      this.mensaje = `No se pudo ${msgC} el evento ${this.eventoEditado.nombreEvento}`;
      this.snackbar = true;
    }
  }
}
</script>
