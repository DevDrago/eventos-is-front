<template>
  <!--
    Everything is wrapped in a label, which acts as a clickable wrapper around a form element.
    In this case, the file input.
  -->
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
    <!-- Now, the file input that we hide. -->
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

interface FileInputEventTarget extends EventTarget {
  files: FileList;
}

interface FileInputEvent extends Event {
  srcElement: FileInputEventTarget;
}

@Component({
  name: "file-input"
})
export default class Login extends Vue {
  @Prop() private value!: any;
  @Prop() private multiple!: boolean;
  @Prop() private accept!: String;
  @Prop() private name!: boolean;

  $refs!: {
    archivoInput: HTMLElement;
  };

  private archivo: Array<File> = [];

  private handleFileChange(e: FileInputEvent) {
    let inputFile: FileInputEventTarget = e.srcElement;
    this.archivo = [];

    if (inputFile !== null) {
      for (const archivo of inputFile.files) {
        console.log(archivo);
        this.archivo.push(archivo);
      }
    }
    this.$emit("input", this.archivo);
  }

  private abrir() {
    this.$refs.archivoInput.click();
  }
}
</script>

<style scoped>
input[type="file"] {
  display: none;
}
</style>