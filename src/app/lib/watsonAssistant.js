const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');
require('dotenv').config();  // import env variables

const asyncAssistantSendMessage = async (options) =>{
  return new Promise((resolve, reject) => {
    watsonAssistant().message(options, (err, res) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(res);
      }
    });
  });
}
const feedback = (messagesResponse, { parameters, result_variable }) => {
	return {
		response_type: 'feedback',
	  title: parameters.title,
	  message: parameters.message,
	  variable: result_variable
	}
};

const WA = () =>{
  parametros = {
    version: process.env.WA_VERSION,
    serviceUrl: process.env.WA_BASE_URL,
    authenticator: new IamAuthenticator({
      apikey: process.env.WA_APIKEY,
    })
  }
  return new AssistantV2(parametros);
}

module.exports = {
  Assistant: WA,
  sendMessage: asyncAssistantSendMessage,
  feedback: feedback
}