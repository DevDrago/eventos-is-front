<template>
  <!--
    Everything is wrapped in a label, which acts as a clickable wrapper around a form element.
    In this case, the file input.
  -->
  <div 
    style=""
  >
    <v-layout align-center wrap justify-space-between row fill-height>
      <v-flex xs12>
        <v-btn
          block
          color="#64b5f6"
          class="white--text mx-0"
          @click="abrir"
        >
          Cargar Imagen
          <v-icon right dark>photo</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs12 md9 v-if="name">
        <v-text-field
          readonly
          v-model="archivo.name"
          label="Archivo seleccionado"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 pt-0>
        <slot />
      </v-flex>
    </v-layout>
  <!-- Now, the file input that we hide. -->
  <input ref="archivo" type="file" @change="handleFileChange" :multiple="multiple" :accept="accept"/>

  </div>
</template>
<script>
export default {
  name: 'file-input',
  data(){
    return {
      archivo: [],
    }
  },
  props: {
    // Using value here allows us to be v-model compatible.
    value: '',
    multiple: false,
    accept: '',
    name: false
  },

  methods: {
    handleFileChange(e) {
      // Whenever the file changes, emit the 'input' event with the file data.
      //this.$set(this.archivo,'archivos',e.target.files)
      this.archivo = [];
      for (const archivo of e.target.files) {
        console.log(archivo);
        this.archivo.push(archivo)
      }
      this.$emit('input', this.archivo)
    },
    abrir() {
      this.$refs.archivo.click();
    }
  }
}
</script>
<style scoped>
/* Don't forget to hide the original file input! */
input[type="file"] {
  display: none;
}

</style>