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
    coordinadores: [],
    actividadesCat: [],
    organizadores:[],
    eventos: [],
    usersCount: 0,
    eventsCount: 0,
    actsCount: 0,
    users: [],
    loaded: false,
    editedItem:{},
    dialog: false,
    dialogDelete: false,
    showAlert: false,
    alertType: '',
    alertMessage: '',
    editedIndex: -1
  },
  mutations:{
    clear(state){
      state.status = '';
    },
    openModal(state){
      state.editedIndex = -1;
      state.dialog = true;
      state.editedItem = {};
    },
    openModalDelete(state, item){
      state.dialogDelete = true;
      state.editedItem = item;
      state.dialog = false;
    },
    setActividades(state, actividades){
      state.actividades = actividades;
    },
    setItem(state, item){
      state.editedItem = item;
      state.dialog = true;
      state.editedIndex = 1;
    },
    closeModal(state){
      state.editedItem = {};
      state.dialog = false;
      state.editedIndex = -1;
    },
    closeModalDelete(state){
      state.editedItem = {};
      state.dialogDelete = false;
    },
    setCoordinadores(state, coordinadores){
      state.coordinadores = coordinadores;
    },
    setOrganizadores(state, organizadores){
      state.organizadores = organizadores;
    },
    setActividadesCat(state, actividadesCat){
      state.actividadesCat = actividadesCat;
    },
    setEventos(state, eventos){
      state.eventos = eventos;
    },
    setUsers(state, users){
      state.users = users;
      state.loaded = true;
    },
    setUsersCount(state, usersCount){
      state.usersCount = usersCount;
    },
    setEventsCount(state, eventsCount){
      state.eventsCount = eventsCount;
    },
    setActsCount(state, actCount){
      state.actsCount = actCount;
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
      state.isLoggedIn = false;
      state.token = '';
      state.isAdmin = false;
      localStorage.removeItem('token');
    },
    showAlert(state, [tipo, mensaje]){
      state.alertType = tipo;
      state.alertMessage = mensaje;
      state.showAlert = true;
      state.dialog = false;
      state.dialogDelete = false;
      setTimeout(() => {
        state.showAlert = false;
      },3000);
    }
  },
  actions:{
    clear(){
      this.commit('clear');
    },
    closeModal(){
      this.commit('closeModal');
    },
    closeModalDelete(){
      this.commit('closeModalDelete');
    },
    openModalStore(){
      this.commit('openModal');
    },
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
            axios.defaults.headers.common.Authorization = token;
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
            axios.defaults.headers.common.Authorization = token;
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
        delete axios.defaults.headers.common.Authorization;
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
    getCoordinadores({commit}) {
      return new Promise((resolve, reject) => {
        axios.get(baseUrl+'/usuarios/coordinadores')
          .then(response => {
            let coordinadores = response.data.coordinadores;
            commit('setCoordinadores', coordinadores);
            resolve(response);
          })
          .catch(error => {
            commit("error", error);
            reject(error);
          });
      });
    },
    getOrganizadores({commit}) {
      return new Promise((resolve, reject) => {
        axios.get(baseUrl+'/usuarios/organizadores')
          .then(response => {
            let organizadores = response.data.organizadores;
            commit('setOrganizadores', organizadores);
            resolve(response);
          })
          .catch(error => {
            commit("error", error);
            reject(error);
          });
      });
    },
    getActividadesCat({commit}) {
      return new Promise((resolve, reject) => {
        axios.get(baseUrl+'/actividades/categorias')
          .then(response => {
            //console.log(response.data.coordinadores);
            let actividadesCat = response.data.categorias;
            commit('setActividadesCat', actividadesCat);
            resolve(response);
          })
          .catch(error => {
            commit("error", error);
            reject(error);
          });
      });
    },
    crearActividad({commit}, usuario){
      return new Promise((resolve,reject) => {

        axios.post(baseUrl+'/actividades/crear', usuario, {headers: { "content-type": "application/json" }, withCredentials: true})

        /*axios({method: 'POST', data: {usuario}, 'url': baseUrl+'/actividades/crear', headers: { "content-type": "application/json" }, withCredentials: true })*/
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            const err = error.response.data.mensaje;
            commit('auth_error', err);
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
    },
    setItem({commit}, item){
      commit('setItem', item);
    },
    openModalDelete({commit}, item){
      commit('openModalDelete', item);
    },
    getUsers({commit}){
      return new Promise((resolve, reject) => {
        axios.get(baseUrl+'/usuarios')
          .then(response => {
            let users = response.data.users;
            commit('setUsers', users);
            resolve(response);
          })
          .catch(error => {
            commit("error", error);
            reject(error);
          });
      });
    },
    getUsersCount({commit}){
      return new Promise((resolve, reject) => {
        axios.get(baseUrl+'/usuarios/count')
          .then(response => {
            let userCount = response.data.us;
            commit('setUsersCount', userCount);
            resolve(response);
          })
          .catch(error => {
            commit("error", error);
            reject(error);
          });
      });
    },
    getEventsCount({commit}){
      return new Promise((resolve, reject) => {
        axios.get(baseUrl+'/eventos/count')
          .then(response => {
            let eventCount = response.data.evCount;
            commit('setEventsCount', eventCount);
            resolve(response);
          })
          .catch(error => {
            commit("error", error);
            reject(error);
          });
      });
    },
    crearEvento({commit}, evento){
      return new Promise((resolve,reject) => {
        axios.post(baseUrl+'/eventos/crear', evento, {headers: { "content-type": "application/json" }, withCredentials: true})
          .then(response => {
            resolve(response);
            commit('showAlert', ['success', 'Evento guardado con éxito']);
          })
          .catch(error => {
            commit('showAlert', ['error', 'Ha ocurrido un error al guardar el Evento']);
            reject(error);
          });
      });
    },
    EditarEvento({commit}, evento){
      return new Promise((resolve,reject) => {
        axios.put(baseUrl+'/eventos/actualizar', evento, {headers: { "content-type": "application/json" }, withCredentials: true})
          .then(response => {
            resolve(response);
            commit('showAlert', ['success', 'Evento actualizado con éxito']);
          })
          .catch(error => {
            commit('showAlert', ['error', 'Ha ocurrido un error al actualizar el Evento']);
            reject(error);
          });
      });
    },
    EliminarEvento({commit}, evento){
      return new Promise((resolve,reject) => {
        axios.post(baseUrl+'/eventos/eliminar', evento, {headers: { "content-type": "application/json" }, withCredentials: true})
          .then(response => {
            resolve(response);
            commit('showAlert', ['success', 'Evento eliminado con éxito']);
          })
          .catch(error => {
            commit('showAlert', ['error', 'Ha ocurrido un error al eliminar el Evento']);
            reject(error);
          });
      });
    },
    getActsCount({commit}){
      return new Promise((resolve, reject) => {
        axios.get(baseUrl+'/actividades/count')
          .then(response => {
            let actCount = response.data.acCount;
            commit('setActsCount', actCount);
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
    isAdmin: state => Boolean(state.isAdmin),
    isLoaded: state => state.loaded
  }
});