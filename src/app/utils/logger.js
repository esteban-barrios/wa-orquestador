// Import fs and my timestamp module
const fs = require("fs");
const ts = require("./timestamps.js");
require('dotenv').config();  // import env variables
var ENV= process.env.ENV;


// Log file settings
const log_dir = "./src/app/utils/logs/";
const log_file_name_prefix = "log";
const log_file_name_suffix = ".txt";
const max_log_file_size = 1024 * 1024; // 1 MB


// Create stream to write output file
var stream;
var numLogs = getLogsNumber();
if (numLogs == 0){
  createNewLogFile(numLogs);
}else{
  const log_file_name = getLogFileName();
  stream = fs.createWriteStream(`${log_file_name}`, { flags: "a+" });
}

// Export functions
var exports = module.exports = {};

// Función para debuguear en consola
exports.consoleLog = (text)=>{
  if(ENV == "dev"){
    console.log("entro");
    console.log(text);
  } 
};

exports.consoleError = (text)=>{
  if(ENV == "dev"){
    console.error(text);
  } 
};

// Función para escribir en el archivo de registro
exports.writeLog = function(content) {
  try {
    // Obtener el tamaño del archivo actual
    const log_file_name = getLogFileName();
    const log_file_stats = fs.statSync(log_file_name);
    const log_file_size = log_file_stats.size;

    // Si el archivo supera el tamaño máximo, cerrar el stream de escritura actual y crear uno nuevo
    if(log_file_size >= max_log_file_size) {
      stream.end();
      createNewLogFile(getLogsNumber());
    }

    // Escribir la marca de tiempo y el contenido en el archivo
    stream.write(ts.getDate(Date.now()) + "\n" + content + "\n\n");
  }
  catch(e) {
    consoleLog("log.writeLog failed.\n" + e.stack);
  }
};

// Función para leer el contenido del archivo de registro
exports.readLog = function(callback) {
  const log_file_name = getLogFileName();
  // Leer el archivo asincrónicamente con codificación UTF-8
  fs.readFile(log_file_name, "utf8", function(read_err, contents) {
    if(read_err) {
      callback("log.readLog [Error]\n" + read_err.stack);
      return;
    }
    // Llamar al callback con el contenido del archivo
    callback(contents);
  });
};

// Función para borrar el archivo de registro
exports.clearLog = function(callback) {
  // Cerrar el stream de escrituraf
  stream.end(function(end_error_str) {
    if(end_error_str) {
      consoleLog("log.clearLog end failed: " + end_error_str);
      callback("log.clearLog end failed: " + end_error_str);
      return;
    }
    // Eliminar el archivo
    const log_file_name = getLogFileName();
    fs.unlink(log_file_name, function(unlink_error_str) {
      if(unlink_error_str) {
        consoleLog("log.clearLog unlink failed: " + unlink_error_str);
        callback("log.clearLog unlink failed: " + unlink_error_str);
        return;
      }
      // Crear un nuevo stream de escritura y llamar al callback
      createNewLogFile(getLogsNumber());
      callback("");
    });       
  });
};

// Función auxiliar para crear un nuevo archivo de registro con un nombre único basado en la fecha y hora actual
function createNewLogFile(number) {
  const log_file_name = `${log_file_name_prefix}_${number}${log_file_name_suffix}`;
  stream = fs.createWriteStream(`${log_dir}${log_file_name}`, { flags: "a+" });
}

// Función auxiliar para obtener el nombre completo del archivo de registro actual
function getLogFileName() {
  const file_list = fs.readdirSync(log_dir);
  const latest_log_file_name = file_list.filter(file_name => file_name.startsWith(log_file_name_prefix)).sort().reverse()[0];
  return `${log_dir}${latest_log_file_name}`;
}

// Función auxiliar para obtener el numero de archivos logs creados
function getLogsNumber() {
  const file_list = fs.readdirSync(log_dir);
  return file_list.length-1;
}