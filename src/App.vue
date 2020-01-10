<template>
<v-app>
  <router-view></router-view>
</v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Admin from './components/Admin.vue';

export default Vue.extend({
  name: 'App',
  components: { },
  data: () => ({
    //
  }),
});
</script>
