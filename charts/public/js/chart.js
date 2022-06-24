
 
 const config = {
   type: 'scatter',
   data: JSON.parse(httpGet('http://localhost:3000/consultarDato')),
   options: {
       showLine: true,
       plugins: {
           title: {
               display: true,
               text: 'Humedad y Presion'
           }
       },
       scales: {
           y: {
               beginAtZero: true,
               ticks: {
                   
                   callback: function(value, index, ticks) {
                       return '%' + value;
                   }
               }
           }
       }
   }
};


const myChart = new Chart(
    document.getElementById('myChart'),
    config
 );
 
const myChart2 = new Chart(
    document.getElementById('myChart2'),
    config
 );

function httpGet(theUrl) {
 let xmlHttpReq = new XMLHttpRequest();
 xmlHttpReq.open("GET", theUrl, false); 
 xmlHttpReq.send();
 return xmlHttpReq.responseText;
}



function clicked (){
setTimeout(500);
myChart.config.data = JSON.parse(httpGet('http://localhost:3000/consultarDato'));

myChart2.config.data = JSON.parse(httpGet('http://localhost:3000/consultarDato'));

setTimeout(()=>{
myChart.update();
myChart2.update();
location.reload();
},1000);

}

