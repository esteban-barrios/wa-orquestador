// import 
const express = require('express');
const logger = require( "../logger");  
const chatbot = require('../watson-assistant');
// create new router with express
const chatBotRouter = express.Router();

// middleware for logs
chatBotRouter.use((req, res, next) => {
  let content = `${req.method} url:: ${req.url}`;
  logger.consoleLog(content + "\n");
  logger.writeLog(content);
  next();
});

chatBotRouter.get('/custom', (req, res) => { 

  return res.render('custom-chatbot',{ title : "Custom Chat Bot",
                                       cssDir:"../css/style.css",
                                       subfolder: "."}
  );
  // chatbot.watsonAssistant().createSession(
  //   {
  //   assistantId: process.env.WA_ID,
  //   },
  //   function(error, response) {
  //     if (error) {
  //       next(err); // passing to default middleware error handler
  //     } else {
  //       console.log("Sesión en WA creada, sessionId: " + response.result.session_id);
  //       return res.render('custom-chatbot',{wa_response: response});
  //     }
  //   }
  // );

});

chatBotRouter.post('/enviar-mensaje', chatbot.handleMessage);


chatBotRouter.get('/embedded', (req, res) => { 
  res.render('embedded-chatbot', {  title : "Embedded Chat Bot",
                                    cssDir:"../css/style.css",
                                    subfolder: ".",
                                    "wa_integration_id"      : process.env.WA_INTEGRATION_ID,
                                    "wa_region"              : process.env.WA_REGION,
                                    "wa_service_instance_id" : process.env.WA_SERVICE_INSTANCE_ID,
                                    "base_url"               : process.env.BASE_URL } 
  );

});

module.exports = chatBotRouter;