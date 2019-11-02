<template>
  <v-layout
    row
    wrap
    align-end
    xs12
    sm6
    pa-2
    mr-3
    style="min-height: 30em; background-color: #49ace71a;"
  >
    <!--Se cargan imagenes-->
    <v-flex xs12 v-if="imagenes.length">
      <v-card>
        <v-container grid-list-sm fluid>
          <v-layout row wrap>
            <v-flex
              v-for="(imagen, key) in imagenes"
              :class="tamGridImagen"
              d-flex
              ref="imagenes"
              :key="key"
            >
              <v-card flat tile class="d-flex">
                <v-img :src="imagen" :alt="imagen" aspect-ratio="1" class="grey lighten-2">
                  <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-layout>
                  <slot>
                    <v-btn
                      absolute
                      dark
                      fab
                      bottom
                      right
                      color="gray"
                      class="my-5"
                      small
                      @click="retirar(key)"
                    >
                      <v-icon>delete_forever</v-icon>
                    </v-btn>
                  </slot>
                </v-img>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
    <!--Fin de Contenedor de Imagenes-->
    <!--Contenedor de boton para cargar imagenes-->
    <v-flex xs12>
      <file-input color="#160c7b" v-model="farchivos" multiple :accept="accept">
        <slot>
          <v-alert :value="errorArchivo" color="error" icon="warning" outline>Seleccione archivo</v-alert>
        </slot>
      </file-input>
    </v-flex>
    <!--Fin de Contenedor de boton para cargar imagenes-->
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import FileInput from "@/components/archivos/FileInput.vue";
@Component({
  components: {
    FileInput
  }
})
export default class Login extends Vue {
  @Prop() public value!: boolean;
  public errorArchivo: boolean = false;
  public archivos = [];
  public farchivos = [];
  public inmueble: any;
  public imagenes: string[] = [];
  public depto = ""; // Se usa debido a que no detecta la asignacion dentro del objeto
  public estado!: number;
  public accept = "image/*";

  constructor() {
    super();
  }

  @Watch("archivos")
  private imagen() {
    this.imagenes = [];
    if (this.archivos) {
      for (const imagen of this.archivos) {
        this.imagenes.push(URL.createObjectURL(imagen));
      }
    }
  }

  @Watch("farchivos")
  private arregloImagen() {
    if (this.farchivos) {
      for (const imagen of this.farchivos) {
        this.archivos.push(imagen);
      }
    }
  }

  get tamGridImagen() {
    switch (this.archivos.length) {
      case 1:
        return "xs12";
      case 2:
        return "xs6";
      default:
        return "xs4";
    }
  }

  private retirar(e: number) {
    this.archivos.splice(e, 1);
  }

  private cancelar() {
    this.$emit("input", false);
  }
}
</script>