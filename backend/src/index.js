const express = require('express');
const app = express()
const routes = require('./routes/index');

//settings request json app
app.use(express.json());
app.use(express.urlencoded({extended: false}) );

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, OPTIONS, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//routes
app.use(routes)

app.listen(3000, ()=>{
    console.log("running on 3000");
})