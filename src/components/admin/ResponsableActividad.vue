<template>
    <v-container fluid>
        <Breadcrumb :items="breadcrumb"></Breadcrumb>
        <Datatable title="Responsable"
        :columnas="headers"
        :datos="actResponsables"
        :nuevo=true
        ></Datatable>
    </v-container>
</template>

<style>
  .c-red{
    background-color:#970a0acc;
    color:white;
  }
  .v-texto{
    background-color: #8606066e;
    color: white !important;
    padding-top: 10px !important;
    padding-bottom: 6px !important;
  }
  .v-acciones{
    background-color:#970a0acc;
    color: white !important;
  }
  .v-application .green--text.text--darken-1 {
    color: white !important;
    caret-color: white !important;
  }
</style>

<script>
    import {mapActions, mapState} from 'vuex';
    import Datatable from '../../components/Datatable';
    import Breadcrumb from '../../components/Breadcrumbs';
    import Alert from '../Alert';
    export default {
        name: 'ResponsableActividad',
        components: {
        Breadcrumb,
        Datatable,
        Alert
        },
        data: () => ({
            breadcrumb: [
                {
                text: 'Dashboard',
                disabled: false,
                href: '/',
                },
                {
                text: 'Responsable de actividad',
                disabled: true,
                href: '/',
                }
            ],
            headers: [
                { text: 'Actividad', align: 'left', value: 'nombreActividad'},
                { text: 'Nombre', value: 'nombres' },
                { text: 'Trabajo realizado', value: 'trabajoRealizado'},
                { text: 'Total horas', value: 'totalHoras' },
                { text: 'Estado', value: 'estado' },
                { text: 'Fecha de registro', value: 'fechaRegistro' },
                { text: 'Acciones', value: 'action', sortable: false }
            ],
        }),
        computed: {
            ...mapState(['actResponsables','dialog', 'editedItem', 'dialogDelete',
            'alertType', 'alertMessage', 'editedIndex']),
            formTitle () {
                return this.editedIndex === -1 ? 'Nuevo registro' : 'Editar registro'
            },
        },
        methods: {
            ...mapActions(['getActResponsables'])
        },
        created() {
            this.getActResponsables();
        }
    }
</script>