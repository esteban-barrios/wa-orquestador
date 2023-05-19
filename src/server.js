const app = require('./app/init');

const port = app.get("port");

// start the server
app.listen(port, (err) => {
  if(err){
    console.log("Error while starting server \n");
  }else{
    console.log(`Server listening at http://localhost:${port} \n`);
  } 
});
