<template>
  <section id="dashboard">
    <mdb-card class="mb-4">
      <mdb-card-body style="padding-bottom: 9px;" class="d-sm-flex justify-content-between">
        <h4 class="mb-sm-0 pt-2">
          <a href="" target="">Inicio</a><span>/</span><span>Dashboard</span>
        </h4>
      </mdb-card-body>
    </mdb-card>
    <section class="mt-lg-5">
      <mdb-row>
        <mdb-col xl="4" md="6" class="mb-r">
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
        </mdb-col>
        <mdb-col xl="4" md="6" class="mb-r">
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
        </mdb-col>
        <mdb-col xl="4" md="6" class="mb-r">
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
        </mdb-col>
      </mdb-row>
    </section>

  </section>
</template>

<script>
import { mdbRow, mdbCol, mdbBtn, mdbCard, mdbCardBody, mdbCardHeader, mdbCardText, mdbIcon, mdbTbl, mdbBarChart, mdbPieChart, mdbLineChart, mdbRadarChart, mdbDoughnutChart, mdbListGroup, mdbListGroupItem, mdbBadge, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter } from 'mdbvue';
import {mapActions, mapState} from 'vuex';

export default {
  name: 'Dashboard',
  components: {
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
    ...mapActions(['getActividades', 'getUsersCount', 'getEventsCount', 'setActsCount'])
  },
  created() {
    this.getActividades();
    this.getUsersCount();
    this.getEventsCount();
  },
  computed: {
    ...mapState(['actividades', 'isAdmin', 'user', 'usersCount', 'eventsCount', 'actsCount']),
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
