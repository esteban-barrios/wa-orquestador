const chatServer = require('./chatServer');

module.exports = {
  handleMessage: chatServer.handleMessage,
  crearSesion: chatServer.crearSesion
};