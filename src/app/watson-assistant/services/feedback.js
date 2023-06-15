module.exports = (messagesResponse, { parameters, result_variable }) => {
	return {
		response_type: 'feedback',
	  title: parameters.title,
	  message: parameters.message,
	  variable: result_variable
	}
};