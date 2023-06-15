const axios = require("axios");

const base_url = process.env.BASE_URL;
const port = process.env.PORT;
const some_async_webservice = base_url+ ":" + port+ "/asyncendpoint";

async function ejemploIntegracion(params) {
  try {
    var payload = { name: 'Aditya' };
    resultado = await axios.post(some_async_webservice, payload)
    return ({status: true, resultado: resultado})
  } catch(error) {
    console.log("Ejemplo integración - Error:", error);
    return({status: false});
  }
}

module.exports = {
  ejemploIntegracion
}