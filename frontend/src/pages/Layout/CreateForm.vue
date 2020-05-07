<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Registro</h4>
        <p class="category">Registra una cámara de fotomulta o una estación de combustible</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
              <md-radio v-model="tipo" value="camara">Cámara</md-radio>
              <md-radio v-model="tipo" value="estacion">Estación</md-radio>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-50">
            <div id="map"></div>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-50">
      
            <div v-if="tipo == 'camara'">
                <md-field>
                    <label>Velocidad maxima</label>
                    <md-input v-model="velMax" type="text"></md-input>
                </md-field>

                <md-field>
                    <label>Foto</label>
                    <md-file v-model="picture" accept="image/*" />
                </md-field>

                <md-field maxlength="5">
                    <label>Comentario</label>
                    <md-textarea v-model="comment"></md-textarea>
                </md-field>
            </div>

            <div v-if="tipo == 'estacion'">
                <md-field>
                    <label>Nombre</label>
                    <md-input v-model="nameStation" type="text"></md-input>
                </md-field>

                <md-field>
                    <label>Foto</label>
                    <md-file v-model="picture" accept="image/*" />
                </md-field>

                <div class="md-layout">  
                    <div class="md-layout-item md-xsmall-size-50"> 
                      <md-field>
                          <label>Combustible</label>
                          <md-input v-model="nameGas1" type="text"></md-input>
                      </md-field> 
                    </div>
                    <div class="md-layout-item md-xsmall-size-50">  
                      <md-field>
                          <label>Precio</label>
                          <md-input v-model="priceGas1" type="text"></md-input>
                      </md-field>
                    </div>
                </div>

                <div class="md-layout md-alignment-bottom-null" v-for="gas in nameGas" v-bind:key="gas.index">  
                    <div class="md-layout-item md-xsmall-size-45 md-size-45"> 
                      <md-field>
                          <label>Combustible</label>
                          <md-input v-model="gas.name" type="text"></md-input>
                      </md-field> 
                    </div>
                    <div class="md-layout-item md-xsmall-size-45 md-size-45">  
                      <md-field>
                          <label>Precio</label>
                          <md-input v-model="gas.price" type="text"></md-input>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-xsmall-size-10 md-size-10"> 
                        <md-button class="md-just-icon md-simple md-danger" v-on:click="deleteRow(gas.index)">
                          <md-icon>close</md-icon>
                          <md-tooltip md-direction="top">Eliminar</md-tooltip>
                        </md-button>
                    </div>
                </div>

                <div class="md-layout-item md-size-100 text-right">
                  <md-button class="md-icon-button md-raised" v-on:click="addRow()">
                    <md-icon>add</md-icon>
                  </md-button>
                </div>
                

                <md-field maxlength="5">
                    <label>Comentario</label>
                    <md-textarea v-model="comment"></md-textarea>
                </md-field>
            </div>
          </div>

          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" v-on:click="showData()">Guardar</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>


<script>
import {Loader} from "google-maps";
import { mapState } from 'vuex'
import apiKey from '../../apiKey';

export default {
  name: "create-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      tipo: "camara",
      velMax: null,
      picture:null,
      nameStation:"",
      nameGas1:"",
      priceGas1:"",
      nameGas:[],
      comment:"",
      addFields:0,
      coordinates:{}
    };
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

      var marker = new google.maps.Marker({
        position: this.myLatlng,
        map:map,
        draggable:true,
        title: "Establece la posición"
      });

      google.maps.event.addListener(marker, 'dragend',  evt => {
        console.log("[Debug] moviendo...")
        console.info(evt.latLng.lat() )
        console.info(evt.latLng.lng() )
          this.coordinates = {lat: evt.latLng.lat(), lng:evt.latLng.lng()}
      });

      // Poner el marcador en el mapa, setMap();
      //marker.setMap(map);
    },
    canIuseGeolocation(){
        return (navigator.geolocation) ? true : false;
    },
    addRow(){
      this.addFields += 1
      this.nameGas.push({index:this.addFields, name:"", price:""})
    },
    deleteRow(index){
      let _this = this;
      var getIndex =  position => {
        return  (_this.nameGas[position].index == index) ? position : getIndex(position+1) 
      }
      let dell = getIndex(0)
      this.nameGas.splice( dell, 1 );
    },
    showData(){
      console.log("[DEBUG] estas son las coordenadas:")
      console.info( this.coordinates )
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
<style></style>
