// import 
const express = require('express');
const logger = require( "../logger");  // import logger handler

// create new router with express
const router = express.Router();

// middleware for logs
router.use((req, res, next) => {
  let content = `${req.method} url:: ${req.url}`;
  console.log(content + "\n");
  logger.writeLog(content);
  next();
});

// handle get requests

//router.get('*', function (req, res) {
//  res.redirect('/error');
//})

router.get('/', (req, res) => { 
  res.render('pages/index');
});

// async error
router.get('/async-error', (req, res, next) => {
  setTimeout(() => {
    try {
      console.log("Async code example.")
      throw new Error;
  } catch (err) { // manually catching
      err.type = 'redirect';
      next(err) // passing to default middleware error handler
  }
  }, 100)
})
router.get('/error', (req, res) => {
  res.send('Error page');
});


// Defining api calls

router.get('/api/send-message', (req, res) => { 
  res.send('Send message');
});

// Basic troubleshooting
router.get( "/api/logs", function( req, res ){
  logger.readLog( function( content ){
        res.status( 200 ).end( content );
    });        
});
router.post( "/api/clearlogs", function( request, response ){
  logger.clearLog( function( error_str ){
      if( error_str ){
          response.status( 500 ).json( { error_str : error_str } );
          return;
      }     
      response.status( 200 ).json( { "result" : "Success" } );
  });       
});

// Definir endpoint de la API para el panel de control
router.get("/api/service-status", (req, res) => {
  // Obtener los datos necesarios del orquestador de un servicio de software
  const serviceState = "activo"; // Estado del servicio (activo o inactivo)
  const runningInstances = 5; // Número de instancias de servicio en ejecución
  const cpuUsage = 50; // Porcentaje de uso de la CPU de las instancias de servicio
  const memoryUsage = 80; // Porcentaje de uso de la memoria de las instancias de servicio
  const storageUsage = 60; // Porcentaje de uso del almacenamiento de las instancias de servicio
  const averageResponseTime = "50 ms"; // Tiempo de respuesta promedio del servicio
  const requestsProcessed = 100; // Número de solicitudes procesadas
  const errors = 2; // Número de errores de servicio

  // Devolver los datos en formato JSON
  res.json({ serviceState, runningInstances, cpuUsage, memoryUsage, storageUsage, averageResponseTime, requestsProcessed, errors });
});

module.exports = router;