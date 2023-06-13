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


module.exports = ApiRouter;