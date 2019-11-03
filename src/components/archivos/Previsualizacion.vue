<template>
  <v-row align-content="end" justify="center">
    <v-col cols="12"  v-if="imagenes.length">
      <v-card>
        <v-container fluid>
          <v-row>
            <v-col
              v-for="(imagen, key) in imagenes"
              ref="imagenes"
              :key="key"
              class="d-flex child-flex"
              :cols="tamGridImagen"
            >
              <v-card flat tile class="d-flex">
                <v-img :src="imagen" :lazy-src="imagen" aspect-ratio="1" class="grey lighten-2">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
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
                      <v-icon>mdi-delete-forever</v-icon>
                    </v-btn>
                  </slot>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
    <v-col cols="12">
      <file-input color="#160c7b" v-model="farchivos" multiple :accept="accept">
        <slot>
          <v-alert :value="errorArchivo" color="error" icon="warning" outlined>Seleccione archivo</v-alert>
        </slot>
      </file-input>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import FileInput from "@/components/archivos/FileInput.vue";
@Component({
  components: {
    FileInput
  }
})
export default class Previsualizacion extends Vue {
  @Prop() public value!: Array<File>;
  @Prop() public accept!:String;
  public errorArchivo: boolean = false;
  public archivos:Array<File> = [];
  public farchivos:Array<File> = [];
  public imagenes: string[] = [];
  private MIMEpermitidos:Array<string> = [];

  constructor() {
    super();
  }

  mounted(){
    this.MIMEpermitidos = this.accept.split(",");
  }

  @Watch("archivos")
  private imagen() {
    this.imagenes = [];
    if (this.archivos) {
      for (const imagen of this.archivos) {
        if(imagen.type.match(/(image)\/.*/))
          this.imagenes.push(URL.createObjectURL(imagen));
      }
    }
  }

  @Watch("farchivos")
  private arregloImagen() {
    if (this.farchivos) {
      for (const imagen of this.farchivos) {
        if(this.MIMEpermitidos.includes(imagen.type) || imagen.type.match(/(image)\/.*/)){
          this.archivos.push(imagen);
        } else{
          console.log(imagen)
        }
      }
      this.$emit("input", this.archivos);
    }
  }

  get tamGridImagen() {
    switch (this.archivos.length) {
      case 1:
        return "12";
      case 2:
        return "6";
      default:
        return "4";
    }
  }

  private retirar(e: number) {
    this.archivos.splice(e, 1);
  }

}
</script>