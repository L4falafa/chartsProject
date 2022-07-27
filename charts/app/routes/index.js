//Configuracion de peticiones get, post, put, delete

/*####################################*/

//variables y modulos requeridos
const expres = require('express');
const controller = require('../controllers/index');
const router = expres.Router();

/*####################################*/

//rutas
router.get('/', controller.getData );

/*####################################*/

//exportar el router
module.exports = router;