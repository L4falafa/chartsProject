const autocolors = window['chartjs-plugin-autocolors'];

Chart.register(autocolors);

var xValues = ["Italia", "Francia", "Espania", "USA", "Argentina", "Alemania"];
var barColors = ["red", "green","blue","orange","brown"];
var yValues = JSON.parse(httpGet('http://localhost:3000/consultarDato'));
console.log(yValues);
//Configuracion del grafico 1


var data = {
    labels: xValues,
    datasets: [{
      label: "2021",
      borderColor: 'rgb(255, 99, 132)',
      data: yValues
    }]
}

//Etiquetas del Valor X


 const config = {
   type: 'bar',
   data: data,
   options: {
       showLine: true,
       plugins: {
            autocolors: {
            mode: 'data'
            },
           title: {
               display: true,
               text: 'Venta Vinos En El Mundo'
           }
       },
       scales: {
           y: {
               beginAtZero: true,
               ticks: {
                   callback: function(value, index, ticks) {
                       return  value+'M';
                   }
               }
           }
       }
   }
};

//Grafico 1
const myChart = new Chart(
   document.getElementById('myChart'),
   config
);

//Grafico 2
const myChart1= new Chart(
    document.getElementById('myChart1'),
    config
 );

 //Grafico 3
const myChart2 = new Chart(
   document.getElementById('myChart2'),
   config
);

//Grafico 4
const myChart3 = new Chart(
    document.getElementById('myChart3'),
    config
 );

//Funcion Get Http
function httpGet(theUrl) {
 let xmlHttpReq = new XMLHttpRequest();
 xmlHttpReq.open("GET", theUrl, false); 
 xmlHttpReq.send();
 return xmlHttpReq.responseText;
}


//Subir datos a la DB cuando clickea el Boton
function subirDatosDB (){
    setTimeout(500);
    myChart.config.data = JSON.parse(httpGet('http://localhost:3000/consultarDato'));
        setTimeout(()=>{
            myChart.update();
            location.reload();
    },1000);

}

function borrarDatosDB (){
    setTimeout(500);
    myChart.config.data = JSON.parse(httpGet('http://localhost:3000/borrarDatos'));
        setTimeout(()=>{
            myChart.update();
            location.reload();
    },1000);

}

//Actualizar grafico cada x segundos

setInterval(() => {
    updateChart(chart);
}, 1*1000);

//Actualizar Dato Funcion
function updateChart(chart){
    chart.config.data = JSON.parse(httpGet('http://localhost:3000/consultarDato'));
    setTimeout(()=>{
        chart.update('none');
    },1000);    
}

