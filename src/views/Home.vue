<template>
  <v-container>
    <Previsulizacion accept="image/*,application/pdf" v-model="archivos"/>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Previsulizacion from '@/components/archivos/Previsualizacion.vue';
//import File from '@/components/archivos/FileInput.vue';

export default {
  name: 'home',
  components: {
    Previsulizacion
  },
  data(){
   return { archivos: ""} 
  },
  watch:{
    log(){
      console.log(archivos)
    }
  }
}
</script>
