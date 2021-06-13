<template>
  <div align="center" justify="center">
    <img src="../assets/logo-is.png" width="70%" class="mb-5">
    <h1>Bienvenid@, {{ this.usuario.nombres }}</h1>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';

export default {
  name: 'Dashboard',
  data () {
    return {
      breadcrumb: [
        {
          text: 'Dashboard',
          disabled: true,
          href: '/',
        }
      ]
    }
  },
  methods:{
    ...mapActions(['getActsCount', 'getUsersCount', 'getEventsCount', 'getRecursosCount', 'getActAsisCount',
    'getActCatCount', 'getActResCount', 'getTiposRecursoCount', 'getTipoUsuarioCount'])
  },
  created() {
    this.getActsCount();
    this.getUsersCount();
    this.getEventsCount();
    this.getActCatCount();
    this.getActResCount();
    this.getTiposRecursoCount();
    this.getRecursosCount();
    this.getTipoUsuarioCount();
    this.getActAsisCount();
  },
  computed: {
    ...mapState(['isAdmin', 'user', 'usersCount', 'eventsCount', 'actsCount', 'recursosCount', 
    'ActCatCount', 'actResCount', 'tiposRecursoCount', 'tipoUsuarioCount', 'actAsisCount']),
    usuario(){
      if (typeof this.user === 'string') 
        return JSON.parse(this.user);
      else
        return this.user;
    }
  }
}
</script>

<style scoped>

</style>
