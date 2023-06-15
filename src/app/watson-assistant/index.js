const chatServer = require('./chatServer');
const {watsonAssistant} = require('./watsonAssistant');

module.exports = {
  handleMessage: chatServer.handleMessage,
  watsonAssistant: watsonAssistant,
};