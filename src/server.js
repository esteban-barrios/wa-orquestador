var app = require('./app/init');
const http = require('http');
const axios = require( "axios" );
const socketio = require( "socket.io");
const logger = require( "./app/utils/logger");
var port = app.get("port"); 
require('dotenv').config();  // import env variables

const base_url = process.env.BASE_URL;
const some_async_webservice = base_url + "/asyncendpoint";

const server = http.Server( app );
server.listen(port, (err) => {
  if(err){
    logger.consoleLog("Error while starting server \n");
  }else{
    logger.consoleLog(`Server listening at http://localhost:${port} \n`);
  } 
});


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


// Use socket.io to send async web service results to the web page where the chatbot is
var socket_p = null;
const io = socketio( server );
io.on( "connection", function( socket ) {
    logger.writeLog( "\nsocket.io connection" );
    socket_p = socket;
});

function sendMessage( data ){
    try{
        logger.writeLog( "sendMessage data:\n" + JSON.stringify( data, null, 3 ) );
        socket_p.emit( "asyncresult", data );
    }
    catch( e ){
        logger.writeLog( "sendMessage caught an error:\n" + e.message + "\n" + e.stack );
    }
}
