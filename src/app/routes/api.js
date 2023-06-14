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
// For Code Engine pipeline to check
ApiRouter.get( "/health", function( request, response )
{
    logger.consoleLog( "/health ..." );
    
    response.status( 200 ).end( "Success" );
    
} );

// Endpoint for Watson Assistant webhook
ApiRouter.post( "/asyncwrapper", function( request, response ) {
    logger.consoleLog( "\n/asyncwrapper body:\n" + JSON.stringify( request.body, null, 3 ) );
    
    var str = request.body.str ? request.body.str : "";
    
    // 1. Respond right away so the chatbot can move on
    // 2. Call the async web service
    // 3. After the web service responds, send a message to the chatbot using the chatbot web api
    
    response.status( 200 ).json( { "error_str" : "", "result" : "Success" } );
    
    callAsyncWebService( str, function( error_str, result_data ){
        if( error_str ){
            sendMessage( { "error_str" : error_str } );
            return;
        }
        sendMessage( result_data ); 
    } );
            
} );


// Pretend async endpoint for demo purposes
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