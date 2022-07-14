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

hbs.registerPartials(__dirname + '/views/partials', function (err) {});
app.set('view engine', 'hbs');
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + "/public"));

//Rutas a utilizar
const datos = require('./routes/datos');
app.use('/datos', datos); 

app.get('/', (req, res) => {

  res.render('index', {})
});

app.listen(port, () => {
  dbManager.testConnection();
  console.log(`Example app listening on port ${port}`)
})