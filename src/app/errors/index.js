const log = require( "../logger");  // import logger 
require('dotenv').config();  // import env variables
var isDev= process.env.IS_DEV;

// middleware for log errors
const logErrors = (err, req, res, next) => {
  if(isDev)console.error(err + "\n");
  log.writeLog("err stack-> " + err.stack);
  next(err);
}

// middleware for error handler (client errors)
const errorHandler = (err, req, res, next) =>{
  if (err.type == 'internal'){
    res.status(500).render('error', {
      title: 'Error interno del servidor',
      status: 500, // Agregar variable status aquí
      message: 'Ocurrió un error interno en el servidor.' // Agregar mensaje de error aquí
    });
  }
  else if (err.type == 'time-out'){
    res.status(408).render('error', {
      title: 'Tiempo max de respuesta',
      status: 408, // Agregar variable status aquí
      message: 'Se cumplió el tiempo maximo de respuesta.' // Agregar mensaje de error aquí
    });
  } 
  else{
    next();
  }
}
// middleware for invalid path
const invalidPathHandler = (req, res, next) => {
  res.status(404).render('error', {
    title: 'Página no encontrada',
    status: 404, // Agregar variable status aquí
    message: 'La página que busca no pudo ser encontrada.' // Agregar mensaje de error aquí
  });
}


const errors = [logErrors, errorHandler, invalidPathHandler];
module.exports = errors;