const http = require('http');
const socketio = require( "socket.io");
const axios      = require( "axios");
const dotenv = require('dotenv').config();  // import env variables

const app = require('./app');
const logger = require( "./app/logger");

const port = app.get("port"); 

const server = http.Server(app);

// Use socket.io to send async web service results to the web page where the chatbot is
var socket_p = null;
const io = socketio(server);
io.on( "connection", function( socket ) {
    logger.writeLog( "\nsocket.io connection" );
    socket_p = socket;
});


server.listen(port, (err) => {
  if(err){
    logger.consoleLog("Error while starting server \n");
  }else{
    logger.consoleLog(`Server listening at http://localhost:${port} \n`);
  } 
});


const base_url = process.env.BASE_URL;
const some_async_webservice = base_url+ ":" + port+ "/asyncendpoint";

function callAsyncWebService( str, callback ){
    var url  = some_async_webservice; // This would be whatever web service you need to call
    var data = { "str" : str };
    
    axios.post( url, data ).then( function( result ){
        if( 200 !== result.status ){
            logger.consoleLog( "callAsyncWebService error: HTTP !== 200" );            
            callback( "Call to async endpoint failed", {} );
            return;
        }
        
        logger.consoleLog( "callAsyncWebService success" );
        callback( "", result.data );
        
    }).catch( function( error ){
        logger.consoleLog( "callAsyncWebService axios error message:\n" + error.message );
        callback( error.message, {} );
        
    });  
}

function sendMessage( data ){
    try{
        logger.consoleLog( "sendMessage data:\n" + JSON.stringify( data, null, 3 ) );
        socket_p.emit( "asyncresult", data );
    }
    catch( e ){
        logger.consoleLog( "sendMessage caught an error:\n" + e.message + "\n" + e.stack );
    }
}


// Endpoint for Watson Assistant webhook
app.post( "/asyncwrapper", function( request, response ) {
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
            
});






