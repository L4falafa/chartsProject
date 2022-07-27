const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const hbs = require('hbs');
const bodyParser = require("body-parser")
const mysql = require('mysql');
const dbManager = require('./models/dbManager.js')

app.use(bodyParser.urlencoded({
  extended:true
})); 

app.set('view engine', 'hbs');
app.set("views", path.join(__dirname + "/views"));

app.use(express.static(path.join(__dirname + "/public")));

//Rutas a utilizar
/*const datos = require('./routes/datos');
app.use('/datos', datos); 
*/
app.get('/', (req, res) => {

  res.render('index', {})
});

app.listen(port, () => {
  //dbManager.testConnection();
  console.log(`Example app listening on port ${port}`)
})