const axios = require("axios");

async function ejemploIntegracion(params) {
  try {
    var payload = { name: 'Aditya' };
    resultado = await axios.post('https://yourdomain.com', payload)
    return ({status: true, resultado: resultado})
  } catch(error) {
    console.log("Ejemplo integración - Error:", error);
    return({status: false});
  }
}

module.exports = {
  ejemploIntegracion
}