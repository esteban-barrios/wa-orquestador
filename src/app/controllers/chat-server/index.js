const ChatServer = require('./chatServer');


module.exports = {
  handleMessage: ChatServer.handleMessage,
  crearSesion: ChatServer.crearSesion
};