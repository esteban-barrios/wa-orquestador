// import 
const express = require('express');
const logger = require( "../logs");  // import logger handler

// create new router with express
const router = express.Router();

// middleware for logs
router.use((req, res, next) => {
  let content = `${req.method} url:: ${req.url}`;
  console.log(content + "\n");
  logger.writeLog(content);
  next();
});

// handle get requests

//router.get('*', function (req, res) {
//  res.redirect('/error');
//})

router.get('/', (req, res) => { 
  res.render('pages/index');
});

router.get('/send-message', (req, res) => { 
  res.send('Send message');
});

// async error
router.get('/async-error', (req, res, next) => {
  setTimeout(() => {
    try {
      console.log("Async code example.")
      throw new Error;
  } catch (err) { // manually catching
      err.type = 'redirect';
      next(err) // passing to default middleware error handler
  }
  }, 100)
})

router.get('/error', (req, res) => {
  res.send('Error page');
});

// basic troubleshooting
router.get( "/logs", function( req, res ){
  logger.readLog( function( content ){
        res.status( 200 ).end( content );
    });        
});

router.post( "/clearlog", function( request, response ){
  logger.clearLog( function( error_str ){
      if( error_str ){
          response.status( 500 ).json( { error_str : error_str } );
          return;
      }     
      response.status( 200 ).json( { "result" : "Success" } );
  });       
});

module.exports = router;