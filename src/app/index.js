// imports
const express = require('express');
var path = require('path');
const routes = require('./routes');  
const errors = require('./errors');
require('dotenv').config();  // import env variables

// initializing app 
const app = express();
// set port
app.set("port",process.env.PORT);

// set static
const publicPath = path.join(__dirname,'../public');
app.use(express.static(publicPath))
// set views folder
app.set("views" , "./src/public/views");
// set views engine
app.set("view engine", "pug");
// set router
app.use(routes);  
// set error handlers
app.use(errors);

module.exports = app;