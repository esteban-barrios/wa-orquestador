var app = require('./app/init');
var http = require('http').Server(app);
var io   = require('socket.io')(http);
var port = app.get("port");
 
// start the server
http.listen(port, (err) => {
  if(err){
    console.log("Error while starting server \n");
  }else{
    console.log(`Server listening at http://localhost:${port} \n`);
  } 
});






