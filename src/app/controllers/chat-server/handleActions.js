const watsonAssistant = require('../../lib/watsonAssistant');
require('dotenv').config();  // import env variables

async function handleActions (messagesResponse, session_id, file) {
  let actions_widget = [];
  if(!messagesResponse.result.outputf) {
    return messagesResponse;
  }
  try {
    // Ejecutar las acciones incluidas en el nodo
    for (const action of messagesResponse.result.output.actions) {
      switch(action.name) {
        case 'feedback':
          messagesResponse.result.output.generic.push(watsonAssistant.feedback(messagesResponse, action));
          break;
      }
    }
    // Si existe un skip user input se envia el control devuelta a Watson Assistant 
    if(messagesResponse.result.context.skills['main skill'].user_defined && messagesResponse.result.context.skills['main skill'].user_defined.skip_user_input == true){

      messagesResponse.result.context.skills['main skill'].user_defined.skip_user_input = false;
      
      // Envio de variables de contexto post action a Watson Assistant
      messagesResponse = await watsonAssistant.sendMessage({
        assistantId: process.env.WA_ID,
        sessionId: session_id,
        context: messagesResponse.result.context,
        input: { options: { return_context: true, alternate_intents: true }}
      });

      // Toma las actions que vengan en este siguiente respuesta
      messagesResponse = await handleActions(messagesResponse, session_id);
      actions_widget = actions_widget.concat(messagesResponse.actions_widget)

      console.log("--------------------------------- VUELTA SOE <<< WA, MessageResponse: ");
      console.log(JSON.stringify(messagesResponse, null, 1))
    }
    messagesResponse.actions_widget = actions_widget;
    return messagesResponse
  } catch(error) {
    console.log("Error en handle actions: " + error);
    return messagesResponse;
  }
}

module.exports = {
  handleActions
};