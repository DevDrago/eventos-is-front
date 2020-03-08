<template>
  <v-data-table
    :headers="columnas"
    :items="datos"
    :title="title"
    :nuevo="nuevo"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>{{title}}</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <template>
          <v-btn v-if="nuevo" color="primary" dark style="margin-left:80%;" @click="openModal">Nuevo</v-btn>
        </template>
        <v-spacer></v-spacer>

      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        delete
      </v-icon>
    </template>
  </v-data-table>
</template>
<style>
  .v-toolbar__title {
    font-size: 1.25rem;
    line-height: 1.5;
    overflow: unset;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style> 
<script>
import {mapActions, mapState} from 'vuex';
  export default {
    name: 'Datatable',
    props: {
        title: String,
        columnas: Array,
        datos: Array,
        nuevo: Boolean,
        editedItem: Object
    },

    data: () => ({
      //dialog: false,
      propModel:{},
    }),

    computed: {
      /*propModel: {
        get() { return this.editedItem },
        set (editedItem) { this.$emit('input', editedItem) },
      },*/
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    created () {
      this.initialize()
    },

    methods: {
      initialize () {
      },
      ...mapActions(['setItem', 'openModalStore', 'openModalDelete']),

      editItem (item) {
        //let indexItem = this.datos.indexOf(item)
        this.propModel = Object.assign({}, item)
        //this.dialog = true
        this.setItem(this.propModel);

      },
      openModal (){
        this.openModalStore();
      },
      deleteItem (item) {
        this.openModalDelete(item);
      },
    },
  }
</script>