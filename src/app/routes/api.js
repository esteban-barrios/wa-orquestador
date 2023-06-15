// import 
const express = require('express');
const logger = require( "../logger");  

// create new router with express
const ApiRouter = express.Router();

// middleware for logs
ApiRouter.use((req, res, next) => {
  let content = `${req.method} url:: ${req.url}`;
  logger.consoleLog(content + "\n");
  logger.writeLog(content);
  next();
});

// basic troubleshooting
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

// code Engine pipeline to check
ApiRouter.get( "/health", function( request, response )
{
    logger.consoleLog( "/health ..." );
    
    response.status( 200 ).end( "Success" );
    
} );

// pretend async endpoint for demo purposes
ApiRouter.post( "/asyncendpoint", function( request, response ) {
    logger.consoleLog( "/asyncendpoint body:\n" + JSON.stringify( request.body, null, 3 ) );
    
    var str = request.body.str ? request.body.str : "";
    
    setTimeout( function(){
        // Wait 10 seconds before responding
        
        logger.consoleLog( "/asyncendpoint responds" );
        
        var result = str.split("").reverse().join(""); // Note: Just a random thing to show results. *Only works for ASCII text.
        
        response.status( 200 ).json( { "error_str" : "", "result" : result } );
        
    }, 10 * 1000 );
    
} );

module.exports = ApiRouter;