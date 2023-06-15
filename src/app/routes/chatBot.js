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

chatBotRouter.post('/enviar-mensaje', chatbot.handleMessage);
chatBotRouter.get('/crear-sesion', chatbot.crearSesion);

module.exports = chatBotRouter;