//configuracion y levante del servidor

/*####################################*/

//variables y modulos requeridos
const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const hbs = require('hbs');
const bodyParser = require("body-parser")
const mysql = require('mysql');
const dbManager = require('./app/models/dbManager');

//variables de rutas
const indexRoutes = require('./app/routes/index');

/*####################################*/
app.use(bodyParser.urlencoded({
  extended:true
})); 
/*####################################*/

// Handlebars y diseño de la pagina

//especifica el motor de plantilla en este caso handlebars 
app.set('view engine', 'hbs');
app.set("views", path.join(__dirname + "/views"));
app.use(express.static(path.join(__dirname + "/public")));

/*####################################*/

//            MIDDLEWARES

//Ruta de la pagina principal 
app.use(indexRoutes);

/*####################################*/

//levanta el servidor
app.listen(port, () => {
  //dbManager.testConnection();
  console.log(`Example app listening on port ${port}`)
})