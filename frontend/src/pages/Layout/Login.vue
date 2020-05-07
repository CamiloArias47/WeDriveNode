<template>
  <div  class="divlogin">
    <div class="container">
      <div class="contenido">
        <figure id="logotipo">
          <img class="img" :src="LoginLogo" width="200" />
        </figure>

        <h2 v-if="form.type == 0">Iniciar sesión</h2>
        <p v-if="form.type == 1" style="font-size: 16px; color: #333;">
          Escriba el correo asociado a su cuenta para recuperar su contraseña.</p>
        <form @submit.prevent="login">

          <input
            type="email"
            :class="{ error: validaEmail }"
            placeholder="Email"
            v-model="form.email"
          />
          <input
            type="password"
            v-if="form.type != 1"
            :class="{ error: validaPassword }"
            placeholder="Contraseña"
            v-model="form.password"
          />

          <button>Aceptar</button>
          <!-- <button v-if="form.type == 0">Iniciar sesión con Google</button> -->
          <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->

        </form>

          <!-- <button v-if="form.type == 0" >Iniciar sesión con Google</button> -->
          <g-signin-button
            :params="googleSignInParams"
            @success="onSignInSuccess"
            @error="onSignInError">
            Ingresa con Google
          </g-signin-button>


        <a
          href="javascript:void(0)"
          @click="form.type = 1"
          v-if="form.type == 0"
          class="olvidoLink"

        >Olvidó su contraseña?</a>

        <router-link to="../registro" 
        class="registroLink" 
        v-if="form.type == 0">
        Registrarse
        </router-link>
        
        <a class="cancelLink"

          href="javascript:void(0)"
          @click="form.type = 0"
          v-if="form.type == 1"
        >Cancelar</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    props: {
        LoginLogo: {
        type: String,
        default: require("@/assets/img/weDrive.png")
        }
    },
  data: function() {
    return {
      form: {
        type: 0, //0 = login, 1 = recuperar contraseña
        email: "",
        password: ""
      },
      objetoEstilo: {
        color: 'red'
      },
      googleSignInParams: this.$store.getters.getGoogleSignInParams
    };
  },
  methods: {
    onSignInSuccess (googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile() // etc etc
      console.log(profile);
      
    },
    onSignInError (error) {
      // `error` contains any error occurred.
      console.log('OH NOES', error)
    },
    /* Validacion del usuario en la BD*/
    login(){
          this.$store.dispatch('retrieveToken',{
                username: this.form.email,
                password: this.form.password
                
              }).then(response => {
                this.$router.go('/app')
              }).catch(error => {
                console.log(error);
              })             
    },
    sendForm() {
      if (this.validaType()) {
        console.log(this.form);
      }
    },
    validaType() {
      if (this.form.type == 0 && !this.validaEmail && !this.validaPassword) {
        return true;
      } else if (this.form.type == 1 && !this.validaEmail) {
        return true;
      } else {
        return false;
      }
    }
  },
  computed: {
    
    validaEmail() {
      var exp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (exp.test(this.form.email)) {
        return false;
      } else {
        return true;
      }
    },
    validaPassword() {
      var exp = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;
      if (exp.test(this.form.password)) {
        return false;
      } else {
        return true;
      }
    },
    title() {
      return this.form.type == 0
        ? "Iniciar sesión"
        : "Reinicio de contraseña";
    }
  }
};
</script>

<style scoped>
html,
body {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100vh;
  /*color: #333333;*/
}
.divlogin {
  background: url("../../assets/img/fondo_transparente.jpg");
  background-color: rgba(0, 0, 0, 0.5);
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100vh;
  display: flex;
  align-content: center;
  align-items: center;
}
.divlogin .container {
  text-align: center;
  margin: auto;
}
.divlogin .container .contenido {
  width: 100%;
  max-width: 300px;
  background: rgba(255, 255, 255, .9); 
  padding: 0 20px 20px 20px;
  display: inline-block;
  margin-left: auto;
  font-weight: bold;
  border-radius: 20px;
}
.divlogin .container .contenido h2 {
  margin: 5px;
  color: black;
  font-size: 2em;
  font-weight: bold;
}
.divlogin .container .contenido input {
  height: 38px;
  margin: 8px 0px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, .4);
  padding: 10px;
  width: 80%;
}
.divlogin .container .contenido input:hover {
  background: rgba(255, 255, 255, 1);
}
.divlogin .container .contenido input.error {
  border-bottom: 3px solid red;
}
.divlogin .container .contenido button {
  height: 40px;
  margin: 8px 0px;  
  border: 0px;
  width: 80%;
  background: rgb(85, 85, 85, .8);
  color: #ffffff;
  font-size: 15px;
  font-weight: inherit;
  border-radius: 5px;
}
.divlogin .container .contenido button:hover {
  background: red;
}
.g-signin-button{
  display: inline-block;
  height: 40px;
  margin: 8px 0px;
  line-height: 40px;
  border: 0px;
  width: 80%;
  background: rgb(85, 85, 85, .8);
  color: #ffffff;
  font-size: 15px;
  border-radius: 5px;  
}
.g-signin-button:hover {
  background: red;
}
.divlogin .container .contenido .olvidoLink {
  margin: 10px;
  font-size: 13px;
  color: #333333;
  text-decoration: none;
  display: block;
}
.divlogin .container .contenido .olvidoLink:hover{
  font-size: 14px;
}
.divlogin .container .contenido .registroLink {
  color: black;
  font-size: 16px;
  margin: 0px;
  text-decoration: none;
  display: block;
}
.divlogin .container .contenido .registroLink:hover {
  color: yellow;
  font-size: 20px;
}
.divlogin .container .contenido .cancelLink {
  color: black;
  font-size: 18px;
  margin: 10px 0 0;
  text-decoration: none;
  display: block;
}
.divlogin .container .contenido .cancelLink:hover {
  color: yellow;
  font-size: 20px;
}
#logotipo {
  margin: 0px;
}
</style>