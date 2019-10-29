import Vue from 'vue';
import Vuex from 'vuex';
//import api from './api';
import axios from "axios";
import router from './router/index';

Vue.use(Vuex);

const baseUrl = 'http://localhost:3000/api';

export default new Vuex.Store({
  state:{
    actividades: []
  },
  mutations:{
    setActividades(state, actividades){
      state.actividades = actividades;
    }
  },
  actions:{
    login({commit}, usuario){
      axios.post(baseUrl+'/usuarios/login', usuario)
        .then(response => {
          console.log(response);
          router.push({name:'Admin'});
        })
        .catch(error => {console.log(error);});
    },
    register({commit}, usuario){
      axios.post(baseUrl+'/usuarios/register', usuario)
        .then(response => {
          console.log(response);
          router.push({name:'Admin'});
        })
        .catch(error => {console.log(error);});
    },
    getActividades({commit}){
      axios.get(baseUrl+'/actividades')
        .then(response => {
          //console.log(response.data.actividades);
          let actividades = response.data.actividades;
          commit('setActividades', actividades);
        })
        .catch(error => {console.log(error);});
    }
  }
});