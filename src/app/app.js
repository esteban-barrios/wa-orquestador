const express = require('express');
var cors = require('cors')
var path = require('path');
const routes = require('./routes');  
const errors = require('./middleware/errorHandler');
require('dotenv').config();  // import env variables

// initializing app 
const app = express();
// set cors
app.use(cors());
// set port
app.set("port",process.env.PORT);
// set public to static path
app.use(express.static(path.join(__dirname,'../public')));
// set views folder
console.log(path.join(__dirname,'./views'));
app.set("views" , path.join(__dirname,'./views'));
// set views engine
app.set('view engine', 'ejs');
// set routes
app.use('/',routes.WebsiteRouter); 
app.use('/api',routes.ApiRouter);  
// set error handler
app.use(errors);

module.exports= app;