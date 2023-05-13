enum ChatEvents {

  // Request events
  getMessages = "getMessages",
  addMessage = "addMessage",
  getMessage = "getMessage",
  updateMessage = "updateMessage",
  deleteMessage = "deleteMessage",

  // Response events
  getMessagesResponse = "getMessagesResponse",
  addMessageResponse = "addMessageResponse",
  getMessageResponse = "getMessageResponse",
  updateMessageResponse = "updateMessageResponse",
  deleteMessageResponse = "deleteMessageResponse",

  // Error events
  getMessagesError = "getMessagesError",
  addMessageError = "addMessageError",
  getMessageError = "getMessageError",
  updateMessageError = "updateMessageError",
  deleteMessageError = "deleteMessageError",

  // Process control events
  startMessageProcessing = "startMessageProcessing",
  stopMessageProcessing = "stopMessageProcessing",
}

export{
  ChatEvents
}