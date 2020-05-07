<template>
  <div>
    <div class="md-layout-item md-medium-size-100 md-size-100" id="controls"> 
      <md-checkbox v-model="stations">Estaciones</md-checkbox>
      <md-checkbox v-model="cameras">Camaras</md-checkbox>
    </div>
    <div id="map"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data(){
    return{
      stations:true,
      cameras:true,
    }
  },
  computed:{
      ...mapState({
          myLatlng: state => state.googleMapSetting.center,
      })
  },
  methods: {
    initMap(google) {
      var mapOptions = this.$store.state.googleMapSetting,
          map = new google.maps.Map(document.getElementById("map"), mapOptions);
      var cameras = [],
          stations = [];
      
      this.$store.state.acceptedmarkers.cameras.forEach(cam => {
        var markerCam = new google.maps.Marker({
          position: new google.maps.LatLng( cam.lat, cam.lng),
          title: "foto multa",
          map:map
        });

        let picture = require("@/assets/img/cameras/"+cam.foto+"");

        var infowindow = new google.maps.InfoWindow({
          content: '<div>'+
                      '<ul>'+
                        '<li><b>ID:</b> '+cam.id+'</li>'+
                        '<li><b>Velocidad:</b> '+cam.velocidad+'</li>'+
                        '<li><b>Comentario:</b> '+cam.comentario+'</li>'+
                        '<li><img src="'+picture+'" /></li>'+
                     ' </ul>'+
                   '</div>'
        });

        markerCam.addListener('click', function() {
          infowindow.open(map, markerCam);
        });

        cameras.push(markerCam)
      });

      this.$store.state.acceptedmarkers.stations.forEach(station => {
        var markerStation = new google.maps.Marker({
          position: new google.maps.LatLng( station.lat, station.lng),
          title: station.name,
          map:map
        });

        let picture = require("@/assets/img/estaciones/"+station.foto+"");

        var infowindow = new google.maps.InfoWindow({
          content: '<div>'+
                      '<ul>'+
                        '<li><b>ID:</b> '+station.id+'</li>'+
                        '<li><b>nombre:</b> '+station.nombre+'</li>'+
                        '<li><b>Comentario:</b> '+station.comentario+'</li>'+
                        '<li><img src="'+picture+'" /></li>'+
                     ' </ul>'+
                   '</div>'
        });

        markerStation.addListener('click', function() {
          infowindow.open(map, markerCam);
        });

        stations.push(markerStation)
      });

      // Poner camaras en el mapa, setMap();
      google.showCameras = ()=>{
        cameras.forEach(cam =>{
          cam.setMap(map)
        })  
      }

      google.hideCamereas = ()=>{
        cameras.forEach(cam =>{
          cam.setMap(null)
        })   
      }

      // Poner estaciones en el mapa, setMap();
      google.showStations = ()=>{
        stations.forEach(station =>{
          station.setMap(map)
        })  
      }

      google.hideStations = ()=>{
        stations.forEach(station =>{
          station.setMap(null)
        })   
      }

      google.showCameras()
      google.showStations()
    },
  },
  watch: {
    cameras: function (newCamera, oldCamera) {
      if(newCamera){
        google.showCameras()
      }
      else{
        google.hideCamereas()
      }
    },
    stations(newStation, oldStation) {
      if(newStation){
        google.showStations()
      }
      else{
        google.hideStations()
      }
    }
  },
  mounted() {
    var _this = this;
    this.$store.state.loader.load().then( google => {
        navigator.geolocation.getCurrentPosition(position => {
            var startLocation = {
                lat: position.coords.latitude, 
                long: position.coords.longitude
            } 
            _this.$store.commit('setCenterMap',new google.maps.LatLng(startLocation.lat, startLocation.long) )
            _this.initMap(google);
        })
    });
  }
};
</script>

<style scoped>
  #controls{
    text-align: right;
  }
</style>