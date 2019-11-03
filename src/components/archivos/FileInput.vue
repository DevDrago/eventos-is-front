<template>
  <div style>
    <v-layout align-center wrap justify-space-between row fill-height>
      <v-flex xs12>
        <v-btn block color="#64b5f6" class="white--text mx-0" @click="abrir">
          Cargar Imagen
          <v-icon right dark>mdi-image</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs12 md9 v-if="name">
        <v-text-field readonly v-model="archivo.name" label="Archivo seleccionado"></v-text-field>
      </v-flex>
      <v-flex xs12 pt-0>
        <slot />
      </v-flex>
    </v-layout>
    <input
      ref="archivoInput"
      type="file"
      @change="handleFileChange"
      :multiple="multiple"
      :accept="accept"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

interface HTMLInputFileElement extends HTMLInputElement {
  files: FileList;
}

@Component({
  name: "file-input"
})
export default class Login extends Vue {
  @Prop() private value!: any;
  @Prop() private multiple!: boolean;
  @Prop() private accept!: String;
  @Prop() private name!: boolean;

  private archivo: Array<File> = [];
  private inputFile!: HTMLInputFileElement;

  $refs!: {
    archivoInput: HTMLInputFileElement;
  };

  mounted() {
    this.inputFile = this.$refs.archivoInput;
  }

  private handleFileChange() {
    this.archivo = [];
    let input = this.inputFile;
    for (const archivo of input.files) {
      console.log(archivo);
      this.archivo.push(archivo);
    }
    this.$emit("input", this.archivo);
  }

  private abrir() {
    this.inputFile.click();
  }
}
</script>

<style scoped>
input[type="file"] {
  display: none;
}
</style>