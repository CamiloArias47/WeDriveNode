<template>  
  <div class="content">
    <div class="md-layout">      
      <div  class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50">
        <chart-card
          :chart-data="usersRegisterdata.data"
          :chart-options="usersRegisterdata.options"
          :chart-type="'Line'"
          data-background-color="blue"
        >
          <template slot="content">
            <h4 class="title">Registro usuarios</h4>
          </template>

        </chart-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50">
        <chart-card
          :chart-data="camerasChart.data"
          :chart-options="camerasChart.options"
          :chart-responsive-options="camerasChart.responsiveOptions"
          :chart-type="'Bar'"
          data-background-color="orange"
        >
          <template slot="content">
            <h4 class="title">Registro de camaras</h4>
          </template>

        </chart-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50">
        <chart-card
          :chart-data="stationsChart.data"
          :chart-options="stationsChart.options"
          :chart-type="'Line'"
          data-background-color="red"
        >
          <template slot="content">
            <h4 class="title">Registro de estaciones</h4>
          </template>
        </chart-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="blue">
          <template slot="header">
            <md-icon>supervised_user_circle</md-icon>
          </template>

          <template slot="content">
            <p class="category">Usuarios</p>
            <h3 class="title">{{ getTotalUsers }}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>account_circle</md-icon>
              total de usuarios registrados
            </div>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="orange">
          <template slot="header">
            <md-icon>linked_camera</md-icon>
          </template>

          <template slot="content">
            <p class="category">Fotomultas Aprobadas</p>
            <h3 class="title">
              {{ getTotalCameras }}
            </h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon class="text-danger">videocam</md-icon>
              total de fotomultas reistradas
            </div>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="red">
          <template slot="header">
            <md-icon>local_gas_station</md-icon>
          </template>

          <template slot="content">
            <p class="category">Estaciones Aprobadas</p>
            <h3 class="title">{{ getTotalStation }}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>ev_station</md-icon>
              Total estaciones de gasolina registradas
            </div>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="grey">
          <template slot="header">
            <md-icon>drive_eta</md-icon>
          </template>

          <template slot="content">
            <p class="category">Gasolina</p>
            <h3 class="title">{{ getAvgGas }}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>local_gas_station</md-icon>
              Promedio precio galón de gasolina
            </div>
          </template>
        </stats-card>
      </div>
     
    </div>
  </div>
</template>

<script>
import {
  StatsCard,
  ChartCard
} from "@/components";

import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    StatsCard,
    ChartCard
  },
  computed:{
    ...mapState({
      avgGas : 'avgGas',
      usersRegisterdata : 'usersRegisterdata',
      stationsChart: 'stationsChart',
      camerasChart:'camerasChart'
    }),
    ...mapGetters([
      'getTotalUsers',
      'getTotalStation',
      'getTotalCameras',
      'getAvgGas'
    ])
  },
  data() {
    return {
      
    };
  },
  mounted(){
    let conf = this.$Chartist.Interpolation.cardinal({tension: 0})
    
    this.$store.commit('setUserLineSmooth',conf);
    this.$store.commit('setStationsLineSmooth',conf);
    
    if(this.$store.state.usuarios.length == 0){
      this.$store.dispatch('setUsuarios')
    } 
    if(this.$store.state.stations.length == 0){
      this.$store.dispatch('getStations')
    } 
    if(this.$store.state.cameras.length == 0){
      this.$store.dispatch('getCameras')
    }
  }
};
</script>
