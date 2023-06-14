// import 
const express = require('express');
const logger = require( "../utils/logger");  // import logger handler


// create new router with express
const WebsiteRouter = express.Router();

// middleware for logs
WebsiteRouter.use((req, res, next) => {
  let content = `${req.method} url:: ${req.url}`;
  logger.consoleLog(content + "\n");
  logger.writeLog(content);
  next();
});


// handle get requests
WebsiteRouter.get('/', (req, res) => { 
  res.render('index');
});

WebsiteRouter.get('/custom-chatbot', (req, res) => { 
  res.render('custom-chatbot');
});

WebsiteRouter.get('/embedded-chatbot', (req, res) => { 
  res.render('embedded-chatbot', {  "wa_integration_id"      : process.env.WA_INTEGRATION_ID,
                                    "wa_region"              : process.env.WA_REGION,
                                    "wa_service_instance_id" : process.env.WA_SERVICE_INSTANCE_ID,
                                    "base_url"               : process.env.WA_BASE_URL } 
  );

});


// // async example error
// WebsiteRouter.get('/async-error', (req, res, next) => {
//   setTimeout(() => {
//     try {
//       //console.log("Async code example.")
//       throw new Error;
//   } catch (err) { // manually catching
//       err.type = 'redirect';
//       next(err) // passing to default middleware error handler
//   }
//   }, 100)
// })

module.exports = WebsiteRouter;