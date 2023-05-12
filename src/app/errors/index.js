const log = require( "../logger");  // import logger 

// middleware for log errors
const logErrors = (err, req, res, next) => {
  console.error(err + "\n");
  log.writeLog("err stack-> " + err.stack);
  next(err);
}

// middleware for error handler (client errors)
const errorHandler = (err, req, res, next) =>{
  if (err.type == 'redirect'){
    res.redirect('/error');
  }
  else if (err.type == 'time-out'){
    res.status(408).send(err);
  } 
  else{
    next(err);
  }
}
// middleware for default handler (server error)
const failSafeHandler = (error, req, res, next) => { 
  res.status(500).send(error)
}


const errors = [logErrors, errorHandler, failSafeHandler];
module.exports = errors;