<template>
  <div class="content">
    <div class="md-layout">

      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <div id="map"></div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data(){
    return{
      act: 'cambar'
    }
  },
  computed:{
      ...mapState({
          myLatlng: state => state.googleMapSetting.center,
          setZoomMap: 'setZoomMap'
      })
  },
  methods: {
    initMap(google) {
      var mapOptions = this.$store.state.googleMapSetting,
          map = new google.maps.Map(document.getElementById("map"), mapOptions),
          _this = this;

      google.aceptButt = id =>{
        alert("Tomalo: "+id)
      }

      google.declineMark = id =>{
        alert("Eliminalo: "+id)
      }

      this.$store.state.checkSource.cameras.forEach(cam => {
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng( cam.lat, cam.lng),
          title: "posicion camaras",
          map:map
        });

        let picture = require("@/assets/img/cameras/"+cam.foto+""),
            sayHai = _this.sayHi;

        var infowindow = new google.maps.InfoWindow({
          content: '<div>'+
                      '<ul>'+
                        '<li><b>ID:</b> '+cam.id+'</li>'+
                        '<li><b>Velocidad:</b> '+cam.velocidad+'</li>'+
                        '<li><b>Comentario:</b> '+cam.comentario+'</li>'+
                        '<li><img src="'+picture+'" /></li>'+
                     ' </ul>'+
                     '<div class="contButtons">'+
                       '<button onclick="google.aceptButt('+cam.id+')" class="buttonAceptar">'+
                            'Aceptar'+
                       '</button>'+
                       '<button onclick="google.declineMark('+cam.id+')" class="buttonCancelar">Cancelar</button>'+
                     '</div>'+
                   '</div>'
        });

        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });

      });
    }
  },
   mounted() {
    var _this = this;
    this.$store.state.loader.load().then( google => {
      _this.$store.commit('setCenterMap',new google.maps.LatLng(3.42158, -76.5225000) )
      _this.$store.commit('setZoomMap',13)
      _this.initMap(google);
    });

    var acepts = document.getElementsByClassName('acceptButton')
    acepts.forEach( btn => {
      btn.addListener('click', event => {
        alert(event)
      })
    })
  }
};
</script>

<style>
  .contButtons{
    display: flex;
    flex-flow: row wrap;
  }
</style>