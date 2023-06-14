const express = require('express');
const bodyParser = require( "body-parser" );
var cors = require('cors');
var path = require('path');
const routes = require('./routes');  
const errors = require('./middleware/errorHandler');
require('dotenv').config();  // import env variables

// initializing app 
const app = express();
// set port
app.set("port",process.env.PORT);
// set public to static path
var public_path = path.resolve(__dirname,'../public');
app.use(express.static(public_path));
// set body parser
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );
// set views folder
app.set("views" , path.join(__dirname,'./views'));
// set views engine
app.set('view engine', 'ejs');

// set cors
app.use(cors());

// set routes
app.use('/',routes.WebsiteRouter); 
app.use('/api',routes.ApiRouter);  
app.use('/chat-bot',routes.ChatBotRouter);
// set error handler
app.use(errors);

module.exports= app;