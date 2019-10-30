import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

const baseUrl = 'http://localhost:3000/api';

export default new Vuex.Store({
  state:{
    status:'',
    statusDT: '',
    token: localStorage.getItem('token') || '',
    user: localStorage.getItem('user') || '',
    errMensaje: '',
    isAdmin: localStorage.getItem('isAdmin') || '',
    actividades: [],
    eventos: []
  },
  mutations:{
    setActividades(state, actividades){
      state.actividades = actividades;
    },
    setEventos(state, eventos){
      state.eventos = eventos;
    },
    auth_request(state){
      state.status = 'Cargando';
    },
    setUser(state, user){
      state.user = user;
      state.isAdmin = (user.tipoUsuario == 1);
    },
    auth_success(state, token){
      state.status = 'Exitoso';
      state.token = token;
    },
    auth_error(state, err){
      state.status = 'Error';
      state.errMensaje = err;
    },
    logout(state){
      state.status = '';
      state.token = '';
    },
    error(state, err){
      state.statusDT = 'Error';
      state.errMensaje = err;
    }
  },
  actions:{
    login({commit}, usuario){
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios.post(baseUrl+'/usuarios/login', usuario)
          .then(response => {
            const token = response.data.token;
            const us = response.data.user;
            localStorage.setItem('token', token);
            const isAdmin = (us.tipoUsuario == 1) ? 'Admin' : '';
            localStorage.setItem('isAdmin', isAdmin);
            localStorage.setItem('user', JSON.stringify(us));
            commit('auth_success', token);
            commit('setUser', us);
            resolve(response);
          })
          .catch(error => {
            const err = error.response.data.mensaje;
            commit('auth_error', err);
            localStorage.removeItem('token');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('user');
            reject(error);
          });
      });
    },
    register({commit}, usuario){
      return new Promise((resolve,reject) => {
        commit('auth_request');
        axios.post(baseUrl+'/usuarios/register', usuario)
          .then(response => {
            const user = response.data.user;
            const token = response.data.token;
            localStorage.setItem('token', token);
            const isAdmin = (user.tipoUsuario == 1) ? 'Admin' : '';
            localStorage.setItem('isAdmin', isAdmin);
            localStorage.setItem('user', JSON.stringify(user));
            commit('auth_success', token);
            commit('setUser', user);
            resolve(response);
          })
          .catch(error => {
            const err = error.response.data.mensaje;
            commit('auth_error', err);
            localStorage.removeItem('token');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('user');
            reject(error);
          });
      });
    },
    logout({commit}){
      return new Promise((resolve, reject) => {
        commit('logout');
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('user');
        resolve();
      });
    },
    getActividades({commit}){
      return new Promise((resolve, reject) => {
        axios.get(baseUrl+'/actividades')
          .then(response => {
            let actividades = response.data.actividades;
            commit('setActividades', actividades);
            resolve(response);
          })
          .catch(error => {
            commit("error", error);
            reject(error);
          });
      });
    },
    getEventos({commit}){
      return new Promise((resolve, reject) => {
        axios.get(baseUrl+'/eventos')
          .then(response => {
            let eventos = response.data.eventos;
            commit('setEventos', eventos);
            resolve(response);
          })
          .catch(error => {
            commit("error", error);
            reject(error);
          });
      });
    }
  },
  getters : {
    isLoggedIn: state => Boolean(state.token),
    authStatus: state => state.status,
    isAdmin: state => Boolean(state.isAdmin)
  }
});