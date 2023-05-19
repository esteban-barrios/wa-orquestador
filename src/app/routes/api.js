// import 
const express = require('express');
const logger = require( "../utils/logger");  // import logger handler

// create new router with express
const ApiRouter = express.Router();

// middleware for logs
ApiRouter.use((req, res, next) => {
  let content = `${req.method} url:: ${req.url}`;
  logger.consoleLog(content + "\n");
  logger.writeLog(content);
  next();
});

// Basic troubleshooting
ApiRouter.get( "/logs", function( req, res ){
  logger.readLog( function( content ){
        res.status( 200 ).end( content );
    });        
});
ApiRouter.post( "/clearlogs", function( request, response ){
  logger.clearLog( function( error_str ){
      if( error_str ){
          response.status( 500 ).json( { error_str : error_str } );
          return;
      }     
      response.status( 200 ).json( { "result" : "Success" } );
  });       
});

// Definir endpoint de la API para el panel de control
ApiRouter.get("/service-status", (req, res) => {
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

module.exports = ApiRouter;