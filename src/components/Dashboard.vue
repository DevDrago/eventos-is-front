<template>
  <section id="dashboard">
    <Breadcrumb :items="breadcrumb"></Breadcrumb>
    <v-container fluid style="padding: 15px 25px 0px 25px;">
      <h1>Administración y parámetros</h1>
      <v-row>
        <v-col cols="6">
          <mdb-card cascade class="cascading-admin-card">
            <div class="admin-up">
              <mdb-icon icon="users" fas class="indigo"/>
              <div class="data">
                <p>TIPOS DE USUARIO</p>
                <h4>
                  <strong>{{ tipoUsuarioCount }}</strong>
                </h4>
              </div>
            </div>
            <mdb-card-body>
              <div class="pers">
                <hr>
                <a href="/tipo-usuario">
                  <h5 class="blue-text">Administrar</h5>
                </a>
              </div>
            </mdb-card-body>
          </mdb-card>
        </v-col>
        <v-col cols="6">
          <mdb-card cascade class="cascading-admin-card">
            <div class="admin-up">
              <mdb-icon icon="list" fas class="warning-color"/>
              <div class="data">
                <p>CATEGORÍAS DE ACTIVIDAD</p>
                <h4>
                  <strong>{{ ActCatCount }}</strong>
                </h4>
              </div>
            </div>
            <mdb-card-body>
              <div class="pers">
                <hr>
                <a href="/categoria-actividad">
                  <h5 class="blue-text">Administrar</h5>
                </a>
              </div>
            </mdb-card-body>
          </mdb-card>
        </v-col>
        <v-col cols="6">
          <mdb-card cascade class="cascading-admin-card">
            <div class="admin-up">
              <mdb-icon icon="fas fa-archive" fas class="red accent-2"/>
              <div class="data">
                <p>TIPOS DE RECURSO</p>
                <h4>
                  <strong>{{ tiposRecursoCount }}</strong>
                </h4>
              </div>
            </div>
            <mdb-card-body>
              <div class="pers">
                <hr>
                <a href="/tipo-recurso">
                  <h5 class="blue-text">Administrar</h5>
                </a>
              </div>
            </mdb-card-body>
          </mdb-card>
        </v-col>
        <v-col cols="6">
          <mdb-card cascade class="cascading-admin-card">
            <div class="admin-up">
              <mdb-icon icon="users" fas class="primary-color"/>
              <div class="data">
                <p>USUARIOS</p>
                <h4>
                  <strong>{{usersCount}}</strong>
                </h4>
              </div>
            </div>
            <mdb-card-body>
              <div class="pers">
                <hr>
                <a href="/usuarios">
                  <h5 class="blue-text">Administrar</h5>
                </a>
              </div>
            </mdb-card-body>
          </mdb-card>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <h1>Gestión de eventos</h1>
      <v-row>
        <v-col cols="4">
          <mdb-card cascade class="cascading-admin-card">
            <div class="admin-up">
              <mdb-icon icon="calendar-alt" class="warning-color"/>
              <div class="data">
                <p>EVENTOS</p>
                <h4>
                  <strong>{{eventsCount}}</strong>
                </h4>
              </div>
            </div>
            <mdb-card-body>
              <div class="pers">
                <hr>
                <a href="/eventos">
                  <h5 class="orange-text">Administrar</h5>
                </a>
              </div>
            </mdb-card-body>
          </mdb-card>
        </v-col>
        <v-col cols="4">
          <mdb-card cascade class="cascading-admin-card">
            <div class="admin-up">
              <mdb-icon icon="list" class="red accent-2"/>
              <div class="data">
                <p>ACTIVIDADES</p>
                <h4>
                  <strong>{{actsCount}}</strong>
                </h4>
              </div>
            </div>
            <mdb-card-body>
              <div class="pers">
                <hr>
                <a href="/actividades">
                  <h5 class="deep-orange-text">Administrar</h5>
                </a>
              </div>
            </mdb-card-body>
          </mdb-card>
        </v-col>
        <v-col cols="4">
          <mdb-card cascade class="cascading-admin-card">
            <div class="admin-up">
              <mdb-icon icon="users" class="indigo"/>
              <div class="data">
                <p>RESPONSABLES</p>
                <h4>
                  <strong>{{actResCount}}</strong>
                </h4>
              </div>
            </div>
            <mdb-card-body>
              <div class="pers">
                <hr>
                <a href="/responsable-actividad">
                  <h5 class="deep-orange-text">Administrar</h5>
                </a>
              </div>
            </mdb-card-body>
          </mdb-card>
        </v-col>
        <v-col cols="4">
          <mdb-card cascade class="cascading-admin-card">
            <div class="admin-up">
              <mdb-icon icon="fas fa-archive" class="primary-color"/>
              <div class="data">
                <p>RECURSOS</p>
                <h4>
                  <strong>{{recursosCount}}</strong>
                </h4>
              </div>
            </div>
            <mdb-card-body>
              <div class="pers">
                <hr>
                <a href="/recurso">
                  <h5 class="deep-orange-text">Administrar</h5>
                </a>
              </div>
            </mdb-card-body>
          </mdb-card>
        </v-col>
        <v-col cols="4">
          <mdb-card cascade class="cascading-admin-card">
            <div class="admin-up">
              <mdb-icon icon="fas fa-tasks" class="indigo"/>
              <div class="data">
                <p>ASISTENCIA</p>
                <h4>
                  <strong>{{actAsisCount}}</strong>
                </h4>
              </div>
            </div>
            <mdb-card-body>
              <div class="pers">
                <hr>
                <a href="/asistencia">
                  <h5 class="deep-orange-text">Administrar</h5>
                </a>
              </div>
            </mdb-card-body>
          </mdb-card>
        </v-col>
      </v-row>
    </v-container>

  </section>
</template>

<script>
import { mdbRow, mdbCol, mdbBtn, mdbCard, mdbCardBody, mdbCardHeader, mdbCardText, mdbIcon, mdbTbl, mdbBarChart, mdbPieChart, mdbLineChart, mdbRadarChart, mdbDoughnutChart, mdbListGroup, mdbListGroupItem, mdbBadge, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter } from 'mdbvue';
import {mapActions, mapState} from 'vuex';
import Breadcrumb from '../components/Breadcrumbs';

export default {
  name: 'Dashboard',
  components: {
    Breadcrumb,
    mdbRow,
    mdbCol,
    mdbBtn,
    mdbCard,
    mdbCardBody,
    mdbCardHeader,
    mdbCardText,
    mdbIcon,
    mdbTbl,
    mdbBarChart,
    mdbPieChart,
    mdbLineChart,
    mdbRadarChart,
    mdbDoughnutChart,
    mdbListGroup,
    mdbListGroupItem,
    mdbBadge,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter
  },
  data () {
    return {
      showFrameModalTop: false,
      showFrameModalBottom: false,
      showSideModalTopRight: false,
      showSideModalTopLeft: false,
      showSideModalBottomRight: false,
      showSideModalBottomLeft: false,
      showCentralModalSmall: false,
      showCentralModalMedium: false,
      showCentralModalLarge: false,
      showCentralModalFluid: false,
      showFluidModalRight: false,
      showFluidModalLeft: false,
      showFluidModalTop: false,
      showFluidModalBottom: false,
      breadcrumb: [
        {
          text: 'Dashboard',
          disabled: true,
          href: '/',
        }
      ],
      barChartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: '#1',
            data: [12, 39, 3, 50, 2, 32, 84],
            backgroundColor: 'rgba(245, 74, 85, 0.5)',
            borderWidth: 1
          }, {
            label: '#2',
            data: [56, 24, 5, 16, 45, 24, 8],
            backgroundColor: 'rgba(90, 173, 246, 0.5)',
            borderWidth: 1
          }, {
            label: '#3',
            data: [12, 25, 54, 3, 15, 44, 3],
            backgroundColor: 'rgba(245, 192, 50, 0.5)',
            borderWidth: 1
          }
        ]
      },
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            barPercentage: 1,
            gridLines: {
              display: true,
              color: 'rgba(0, 0, 0, 0.1)'
            }
          }],
          yAxes: [{
            gridLines: {
              display: true,
              color: 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
              beginAtZero: true
            }
          }]
        }
      },
      pieChartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            data: [300, 50, 100, 40, 120, 24, 52],
            backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#ac64ad'],
            hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774', '#da92db']
          }
        ]
      },
      pieChartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      lineChartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: '#1',
            backgroundColor: 'rgba(245, 74, 85, 0.5)',
            data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
            label: '#2',
            backgroundColor: 'rgba(90, 173, 246, 0.5)',
            data: [12, 42, 121, 56, 24, 12, 2]
          },
          {
            label: '#3',
            backgroundColor: 'rgba(245, 192, 50, 0.5)',
            data: [2, 123, 154, 76, 54, 23, 5]
          }
        ]
      },
      lineChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            gridLines: {
              display: true,
              color: 'rgba(0, 0, 0, 0.1)'
            }
          }],
          yAxes: [{
            gridLines: {
              display: true,
              color: 'rgba(0, 0, 0, 0.1)'
            }
          }]
        }
      },
      radarChartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: '#1',
            backgroundColor: 'rgba(245, 74, 85, 0.5)',
            data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
            label: '#2',
            backgroundColor: 'rgba(90, 173, 246, 0.5)',
            data: [12, 42, 121, 56, 24, 12, 2]
          },
          {
            label: '#3',
            backgroundColor: 'rgba(245, 192, 50, 0.5)',
            data: [2, 123, 154, 76, 54, 23, 5]
          }
        ]
      },
      radarChartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      doughnutChartData: {
        labels: ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'],
        datasets: [
          {
            data: [300, 50, 100, 40, 120],
            backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
            hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774']
          }
        ]
      },
      doughnutChartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cascading-admin-card {
  margin: 20px 0;
}
.cascading-admin-card .admin-up {
  margin-left: 4%;
  margin-right: 4%;
  margin-top: -20px;
}
.cascading-admin-card .admin-up .fas,
.cascading-admin-card .admin-up .far {
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.2), 0 2px 13px 0 rgba(0, 0, 0, 0.19);
  padding: 1.7rem;
  font-size: 2rem;
  color: #fff;
  text-align: left;
  margin-right: 1rem;
  border-radius: 3px;
}
.cascading-admin-card .admin-up .data {
  float: right;
  margin-top: 2rem;
  text-align: right;
}
.admin-up .data p {
  color: #999999;
  font-size: 20px;
}
.classic-admin-card .card-body {
  color: #fff;
  margin-bottom: 0px;
  padding: 0px !important;
}

.classic-admin-card .card-body .pers {
  padding-top: 0px !important;
  padding-bottom: 4px;
  text-align: center !important;
}

.card-body{
  padding-top: 0px !important;
  padding-bottom: 0px;
  text-align: center !important;
}

hr {
  margin-top: 0px !important;
  margin-bottom: 7px !important;
}
.classic-admin-card .card-body p {
  font-size: 13px;
  opacity: 0.7;
  margin-bottom: 0;
}
.classic-admin-card .card-body h4 {
  margin-top: 10px;
}
</style>
