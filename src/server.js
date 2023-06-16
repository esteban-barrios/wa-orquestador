const http = require('http');
const socketio = require( "socket.io");

const app = require('./app');
const logger = require( "./app/logger");

const port = app.get("port"); 

const server = http.Server(app);

// Use socket.io to send async web service results to the web page where the chatbot is
var socket_p = null;
const io = socketio(server);
io.on( "connection", function( socket ) {
    logger.consoleLog( "\nsocket.io connection" );
    socket_p = socket;
});


server.listen(port, (err) => {
  if(err){
    logger.consoleLog("Error while starting server \n");
  }else{
    logger.consoleLog(`Server listening at http://localhost:${port} \n`);
  } 
});








