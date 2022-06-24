const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const hbs = require('hbs');
const bodyParser = require("body-parser")
const mysql = require('mysql');

app.use(bodyParser.urlencoded({
  extended:true
}));

hbs.registerPartials(__dirname + '/views/partials', function (err) {});
app.set('view engine', 'hbs');
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + "/public"));

 
var data = {
  datasets: [{
    label: 'Dia1',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [],
  }]
};

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "sensores"
});  

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/', (req, res) => {
  res.render('index', {
    Titulo: "juas juas",
    data: data
})
});

app.get('/consultarDato', (req, res) => {
  con.query("SELECT humedad,presion FROM sensor ORDER BY humedad, presion ASC", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    
    result.forEach(element => {
        console.log(element.humedad)
    });
    data.datasets[0].data.length = 0;
    result.forEach(a => {
      data.datasets[0].data.push({x: a.presion , y: a.humedad})
    });
    
    res.send(JSON.stringify(data));
  });



});




app.post('/subirDato', (req, res) => {

  var sql = "INSERT INTO sensor (humedad, presion) VALUES ( "+req.body.humedad+", "+req.body.presion+")";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})