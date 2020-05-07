<template>
    <div class="window">
        <div class="container">
            <h1>Error</h1>
            <router-link class="p" to="/login">Volver a la página de Inicio</router-link>
        </div>
    </div>
  
</template>

<style scoped>
    html,
    body {
        padding: 0px;
        margin: 0px;
        width: 100%;
        height: 100vh;
    } 

    .window {
        background: url("../../assets/img/fondo_transparente.jpg"); 
        background-color: rgba(0, 0, 0, 0.9);
        background-size: cover;
        background-position: center center;
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center; 
    }

    .window .container{
        background-color: rgba(255, 255, 255, 0.9);
        border-radius: 25px;
        width: 30%;
        height: 40%;
        max-width: 300px;
        max-height: 500px;
        display: inline-block; 
        text-align: center;  
        font-size: 30px; 
    }   

    .window .container h1{
        color: red;
        font-size: 60px;
    }
    .window .container .p {
        font-size: 30px;
        line-height: 40px;
        color:black;    
    }

</style>