const express = require('express');
const dbManager = require('dbManager');
const router = express.Router();

var data = {
    datasets: [{
      label: 'Dia1',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [],
    }]
  };
  
router.get('/consultarDato', async (req, res) => {
    try {
        var result = await dbManager.mySqlQueryAsync("SELECT humedad,presion FROM sensor");      
        data.datasets[0].data.length = 0;
        let datos = []
        result.forEach(a => {
          datos.push(a.presion)
        });
        console.log("consultarDato "+datos);
        res.send(JSON.stringify(datos));
          
    } catch (error) {
        console.log(error);
    }

});
  
router.post('/subirDato', async (req, res) => {
  console.log(req.body)
  for (var key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      var valueKey = req.body[key];
      if(!isNaN(valueKey) && valueKey != ''){
      
        try {
            con.query("DELETE FROM `sensor` WHERE 1")
            var sql = "INSERT INTO sensor (presion) VALUES ("+valueKey+")";

            dbManager.mySqlQueryAsync(sql);      
        } catch (error) {
            console.log(error); 
        }
     }
    }
  }
});

module.exports = router;