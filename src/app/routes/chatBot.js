// import 
const express = require('express');
const logger = require( "../utils/logger");  // import logger handler
const chatbot= require('../controllers/chat-server/chatServer')
// create new router with express
const chatBotRouter = express.Router();

// middleware for logs
chatBotRouter.use((req, res, next) => {
  let content = `${req.method} url:: ${req.url}`;
  logger.consoleLog(content + "\n");
  logger.writeLog(content);
  next();
});

chatBotRouter.post('/mensaje', chatbot.handleMessage);
chatBotRouter.get('/sesion', chatbot.crearSesion);

module.exports = chatBotRouter;