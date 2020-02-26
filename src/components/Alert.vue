<template>
  <div>
    <v-alert 
    :type="tipo"
    :mensaje="mensaje"
    border="top"
    dismissible
    v-if="showAlert">
      {{mensaje}}
    </v-alert>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
    name: 'Datatable',
    props: {
        tipo: String,
        mensaje: String
    },
    computed: {
        ...mapState(['showAlert'])
    }
}
</script>