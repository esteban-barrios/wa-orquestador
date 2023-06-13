const handleActions = require('./handleActions');
const { watsonAssistant, sendMessage } = require('../../lib/watsonAssistant');

function crearSesion(req, res) {
  watsonAssistant().createSession({
      assistantId: process.env.WA_ID,
    },
    function(error, response) {
      if (error) {
        return res.send(error);
      } else {
        console.log("Sesión en WA creada, sessionId: " + response.result.session_id);
        return res.send(response);
      }
    }
  );
};


async function handleMessage(req, res, next) {
  let messagesResponse;
  console.log("data: " + JSON.stringify(req.body.data));
  try {
    messagesResponse = await envia_mensaje(req.body.data)
    res.json(messagesResponse);
  } catch(error) {
    console.log("Error en handleMessage", error); // send to error hanlder
    next(error);
  }
}

async function envia_mensaje(data) {

  //Si viene contexto desde el widget lo incluye
  data.context = {skills: { "main skill": { user_defined : { ...data.context }}}}

  //Si viene user_id, lo incluye en el contexto
  if(data.user_id){
    data.context = {...data.context, global: {system: {user_id: data.user_id}}};
  }

  // Envío de mensaje al servicio de Watson Assitant. Recién ahora hay contexto.
  messagesResponse = await sendMessage({
    assistantId: process.env.WATSON_ASSISTANT_ID,
    sessionId: data.sessionId,
    input : {...data.input, options: { return_context: true, debug: true, ...data.input.options } },
    context: data.context
  });

  console.log("--------------------------------------- SERVER <<< WA, MessageResponse.result: ");
  console.log(JSON.stringify(messagesResponse.result, null, 1))
  
  messagesResponse = await handleActions(messagesResponse, data.sessionId, data.file);

  // Formato de mensaje para ser recibido por el widget
  messagesResponse = { 
    messages: messagesResponse.result.output.generic,
    context: messagesResponse.result.context,
    actions: messagesResponse.actions_widget,
    sessionId: data.sessionId
  };
  console.log("--------------------------------------- WIDGET <<< SERVER, MessageResponse: ");
  console.log(messagesResponse)
  return messagesResponse;
}

module.exports = {
  crearSesion,
  handleMessage
}
