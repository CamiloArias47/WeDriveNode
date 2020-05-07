const express = require('express');
const app = express()
const routes = require('./routes/index');

//settings request json app
app.use(express.json());
app.use(express.urlencoded({extended: false}) );

//routes
app.use(routes)

app.listen(3000, ()=>{
    console.log("running on 3000");
})