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
    tipRecurso: [],
    actividadesCat: [],
    eventosAct: [],
    organizadores:[],
    apoyos: [],
    apoyosC: [],
    eventos: [],
    recursos: [],
    actResponsables: [],
    ActividadesRes: [],
    tiposRecurso: [],
    recursosCount:0,
    usersCount: 0,
    eventsCount: 0,
    actsCount: 0,
    ActCatCount: 0,
    actResCount: 0,
    tiposRecursoCount: 0,
    users: [],
    loaded: false,
    editedItem:{},
    dialog: false,
    dialogDelete: false,
    showAlert: false,
    alertType: '',
    alertMessage: '',
    editedIndex: -1,
    estados: []
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
    setRecurso(state, rec){
      state.recursos = rec;
    },
    setTipRecurso(state, tr){
      state.tipRecurso = tr;
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
    setApoyos(state, apoyos){
      state.apoyos = apoyos;
    },
    setApoyosC(state, aC){
      state.apoyosC = aC;
    },
    setActividadesRes(state, acRes){
      state.ActividadesRes = acRes;
    },
    setActividadesCat(state, actividadesCat){
      state.actividadesCat = actividadesCat;
    },
    setStateAct(state, estado){
      state.estados = estado;
    },
    setEventos(state, eventos){
      state.eventos = eventos;
    },
    setUsers(state, users){
      state.users = users;
      state.loaded = true;
    },
    setActResponsables(state, actRes){
      state.actResponsables = actRes;
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
    setEventosAct(state, eventoAct){
      state.eventosAct = eventoAct;
    },
    setActCatCount(state, acCat){
      state.ActCatCount = acCat;
    },
    setTiposRecurso(state, tipoR){
      state.tiposRecurso = tipoR;
    },
    setActResCount(state, acRCount){
      state.actResCount = acRCount;
    },
    setTiposRecursoCount(state, tRCount){
      state.tiposRecursoCount = tRCount;
    },
    setRecursoCount(state, RCount){
      state.recursosCount = RCount;
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
    //LISTADOS
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
    getApoyos({commit}) {
      return new Promise((resolve, reject) => {
        axios.get(baseUrl+'/usuarios/apoyos')
          .then(response => {
            let apoyos = response.data.apoyos;
            commit('setApoyos', apoyos);
            resolve(response);
          })
          .catch(error => {
            commit("error", error);
            reject(error);
          });
      });
    },
    getApoyosCoordinadores({commit}) {
      return new Promise((resolve, reject) => {
        axios.get(baseUrl+'/usuarios/apoyoscoor')
          .then(response => {
            let apoyosC = response.data.apoyosCoor;
            commit('setApoyosC', apoyosC);
            resolve(response);
          })
          .catch(error => {
            commit("error", error);
            reject(error);
          });
      });
    },

    //CATEGORÍAS DE ACTIVIDAD
    getActividadesCat({commit}) {
      return new Promise((resolve, reject) => {
        axios.get(baseUrl+'/actividades/categorias')
          .then(response => {
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
    crearCatAct({commit}, actividadesCat){
      return new Promise((resolve,reject) => {
        axios.post(baseUrl+'/actividadcategoria/crear', actividadesCat, {headers: { "content-type": "application/json" }, withCredentials: true})
          .then(response => {
            resolve(response);
            commit('showAlert', ['success', 'Categoría de actividad guardada con éxito']);
          })
          .catch(error => {
            commit('showAlert', ['error', 'Ha ocurrido un error al guardar la categoría de actividad']);
            reject(error);
          });
      });
    },
    EditarCatAct({commit}, actividadesCat){
      return new Promise((resolve,reject) => {
        axios.put(baseUrl+'/actividadcategoria/actualizar', actividadesCat, {headers: { "content-type": "application/json" }, withCredentials: true})
          .then(response => {
            resolve(response);
            commit('showAlert', ['success', 'Categoría de actividad actualizada con éxito']);
          })
          .catch(error => {
            commit('showAlert', ['error', 'Ha ocurrido un error al actualizar la categoría de actividad']);
            reject(error);
          });
      });
    },
    EliminarCatAct({commit}, actividadesCat){
      return new Promise((resolve,reject) => {
        axios.post(baseUrl+'/actividadcategoria/eliminar', actividadesCat, {headers: { "content-type": "application/json" }, withCredentials: true})
          .then(response => {
            resolve(response);
            commit('showAlert', ['success', 'Categoría de actividad eliminada con éxito']);
          })
          .catch(error => {
            commit('showAlert', ['error', 'Ha ocurrido un error al eliminar la categoría de actividad']);
            reject(error);
          });
      });
    },

    //ACTIVIDADES
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
    crearActividad({commit}, actividad){
      return new Promise((resolve,reject) => {
        axios.post(baseUrl+'/actividades/crear', actividad, {headers: { "content-type": "application/json" }, withCredentials: true})
          .then(response => {
            resolve(response);
            commit('showAlert', ['success', 'Actividad guardada con éxito']);
          })
          .catch(error => {
            commit('showAlert', ['error', 'Ha ocurrido un error al guardar la Actividad']);
            reject(error);
          });
      });
    },
    EditarActividad({commit}, actividad){
      return new Promise((resolve,reject) => {
        axios.put(baseUrl+'/actividades/actualizar', actividad, {headers: { "content-type": "application/json" }, withCredentials: true})
          .then(response => {
            resolve(response);
            commit('showAlert', ['success', 'Actividad actualizada con éxito']);
          })
          .catch(error => {
            commit('showAlert', ['error', 'Ha ocurrido un error al actualizar la actividad']);
            reject(error);
          });
      });
    },
    EliminarActividad({commit}, actividad){
      return new Promise((resolve,reject) => {
        axios.post(baseUrl+'/actividades/eliminar', actividad, {headers: { "content-type": "application/json" }, withCredentials: true})
          .then(response => {
            resolve(response);
            commit('showAlert', ['success', 'Actividad eliminada con éxito']);
          })
          .catch(error => {
            commit('showAlert', ['error', 'Ha ocurrido un error al eliminar la actividad']);
            reject(error);
          });
      });
    },
    getEventosAct({commit}) {
      return new Promise((resolve, reject) => {
        axios.get(baseUrl+'/actividades/eventos')
          .then(response => {
            let eventosAct = response.data.eventos;
            commit('setEventosAct', eventosAct);
            resolve(response);
          })
          .catch(error => {
            commit("error", error);
            reject(error);
          });
      });
    },
    getEstadosAct({commit}){
      return new Promise((resolve, reject) => {
        axios.get(baseUrl+'/actividades/estados')
          .then(response => {
            let estados = response.data.estados;
            commit('setStateAct', estados);
            resolve(response);
          })
          .catch(error => {
            commit("error", error);
            reject(error);
          });
      });
    },

    //EVENTOS
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
    //RESPONSABLES DE ACTIVIDAD
    getActResponsables({commit}){
      return new Promise((resolve, reject) => {
        axios.get(baseUrl+'/actividadresponsable')
          .then(response => {
            let acR = response.data.actividadresponsable;
            commit('setActResponsables', acR);
            resolve(response);
          })
          .catch(error => {
            commit("error", error);
            reject(error);
          });
      });
    },
    getActividadesRes({commit}){
      return new Promise((resolve, reject) => {
        axios.get(baseUrl+'/actividadresponsable/actividades')
          .then(response => {
            let acRes = response.data.actResponsables;
            commit('setActividadesRes', acRes);
            resolve(response);
          })
          .catch(error => {
            commit("error", error);
            reject(error);
          });
      });
    },
    crearActividadesRes({commit}, actividad){
      return new Promise((resolve,reject) => {
        axios.post(baseUrl+'/actividadresponsable/crear', actividad, {headers: { "content-type": "application/json" }, withCredentials: true})
          .then(response => {
            resolve(response);
            commit('showAlert', ['success', 'Responsable de actividad guardado con éxito']);
          })
          .catch(error => {
            commit('showAlert', ['error', 'Ha ocurrido un error al guardar al responsable de actividad']);
            reject(error);
          });
      });
    },
    editarActividadesRes({commit}, actividad){
      return new Promise((resolve,reject) => {
        axios.put(baseUrl+'/actividadresponsable/actualizar', actividad, {headers: { "content-type": "application/json" }, withCredentials: true})
          .then(response => {
            resolve(response);
            commit('showAlert', ['success', 'Responsable de actividad actualizado con éxito']);
          })
          .catch(error => {
            commit('showAlert', ['error', 'Ha ocurrido un error al actualizar al responsable de actividad']);
            reject(error);
          });
      });
    },
    eliminarActividadesRes({commit}, actividad){
      return new Promise((resolve,reject) => {
        axios.post(baseUrl+'/actividadresponsable/eliminar', actividad, {headers: { "content-type": "application/json" }, withCredentials: true})
          .then(response => {
            resolve(response);
            commit('showAlert', ['success', 'Responsable de actividad eliminado con éxito']);
          })
          .catch(error => {
            commit('showAlert', ['error', 'Ha ocurrido un error al eliminar al responsable de actividad']);
            reject(error);
          });
      });
    },

    //TIPOS DE RECURSO
    getTiposRecurso({commit}){
      return new Promise((resolve, reject) => {
        axios.get(baseUrl+'/tiporecurso')
          .then(response => {
            let TR = response.data.tipoRecurso;
            commit('setTiposRecurso', TR);
            resolve(response);
          })
          .catch(error => {
            commit("error", error);
            reject(error);
          });
      });
    },
    crearTipoRecurso({commit}, tipoRecurso){
      return new Promise((resolve,reject) => {
        axios.post(baseUrl+'/tiporecurso/crear', tipoRecurso, {headers: { "content-type": "application/json" }, withCredentials: true})
          .then(response => {
            resolve(response);
            commit('showAlert', ['success', 'Tipo de recurso guardado con éxito']);
          })
          .catch(error => {
            commit('showAlert', ['error', 'Ha ocurrido un error al guardar el tipo de recurso']);
            reject(error);
          });
      });
    },
    editarTipoRecurso({commit}, tipoRecurso){
      return new Promise((resolve,reject) => {
        axios.put(baseUrl+'/tiporecurso/actualizar', tipoRecurso, {headers: { "content-type": "application/json" }, withCredentials: true})
          .then(response => {
            resolve(response);
            commit('showAlert', ['success', 'Tipo de recurso actualizado con éxito']);
          })
          .catch(error => {
            commit('showAlert', ['error', 'Ha ocurrido un error al actualizar el tipo de recurso']);
            reject(error);
          });
      });
    },
    eliminarTipoRecurso({commit}, tipoRecurso){
      return new Promise((resolve,reject) => {
        axios.post(baseUrl+'/tiporecurso/eliminar', tipoRecurso, {headers: { "content-type": "application/json" }, withCredentials: true})
          .then(response => {
            resolve(response);
            commit('showAlert', ['success', 'Tipo de recurso eliminado con éxito']);
          })
          .catch(error => {
            commit('showAlert', ['error', 'Ha ocurrido un error al eliminar el tipo de recurso']);
            reject(error);
          });
      });
    },

    //RECURSOS
    getRecurso({commit}){
      return new Promise((resolve, reject) => {
        axios.get(baseUrl+'/recursos')
          .then(response => {
            let R = response.data.recursos;
            commit('setRecurso', R);
            resolve(response);
          })
          .catch(error => {
            commit("error", error);
            reject(error);
          });
      });
    },
    getTipoRecursoR({commit}){
      return new Promise((resolve, reject) => {
        axios.get(baseUrl+'/recursos/tipos')
          .then(response => {
            let R = response.data.tipoRecurso;
            commit('setTipRecurso', R);
            resolve(response);
          })
          .catch(error => {
            commit("error", error);
            reject(error);
          });
      });
    },
    crearRecurso({commit}, recurso){
      return new Promise((resolve,reject) => {
        axios.post(baseUrl+'/recursos/crear', recurso, {headers: { "content-type": "application/json" }, withCredentials: true})
          .then(response => {
            resolve(response);
            commit('showAlert', ['success', 'Recurso guardado con éxito']);
          })
          .catch(error => {
            commit('showAlert', ['error', 'Ha ocurrido un error al guardar el recurso']);
            reject(error);
          });
      });
    },
    
    //CONTADORES
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
    },
    getActCatCount({commit}){
      return new Promise((resolve, reject) => {
        axios.get(baseUrl+'/actividades/categorias/count')
          .then(response => {
            let catActCount = response.data.acCatCount;
            commit('setActCatCount', catActCount);
            resolve(response);
          })
          .catch(error => {
            commit("error", error);
            reject(error);
          });
      });
    },
    getActResCount({commit}){
      return new Promise((resolve, reject) => {
        axios.get(baseUrl+'/actividadresponsable/count')
          .then(response => {
            let actResCount = response.data.acResCount;
            commit('setActResCount', actResCount);
            resolve(response);
          })
          .catch(error => {
            commit("error", error);
            reject(error);
          });
      });
    },
    getTiposRecursoCount({commit}){
      return new Promise((resolve, reject) => {
        axios.get(baseUrl+'/tiporecurso/count')
          .then(response => {
            let tipoRCount = response.data.tipoRecCount;
            commit('setTiposRecursoCount', tipoRCount);
            resolve(response);
          })
          .catch(error => {
            commit("error", error);
            reject(error);
          });
      });
    },
    getRecursosCount({commit}){
      return new Promise((resolve, reject) => {
        axios.get(baseUrl+'/recursos/count')
          .then(response => {
            let RCount = response.data.recCount;
            commit('setRecursoCount', RCount);
            resolve(response);
          })
          .catch(error => {
            commit("error", error);
            reject(error);
          });
      });
    },
  },
  getters : {
    isLoggedIn: state => Boolean(state.token),
    authStatus: state => state.status,
    isAdmin: state => Boolean(state.isAdmin),
    isLoaded: state => state.loaded
  }
});