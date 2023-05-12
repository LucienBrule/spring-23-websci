import {EventEmitter} from "events";
import {ChatMessage, IChatMessage} from "../../models/chat";
import {MessageQueue, IChatMessageQueue} from './message-queue';
import {RoomManager, IRoomManager} from './room-manager';
import {MessageProcessor, IMessageProcessor} from './message-processor';
import {ChatEventConnection, IChatEventConnection} from "./chat-event-connection";


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
}

class ChatController extends EventEmitter{

  public static instance: ChatController;
  private messageQueue: IChatMessageQueue;
  private roomManager: IRoomManager;
  private messageProcessor: IMessageProcessor;
  private chatEventConnection: IChatEventConnection;

  constructor() {
    super();

    this.messageQueue = new MessageQueue();
    this.roomManager = new RoomManager();
    this.chatEventConnection = ChatEventConnection.getInstance()
    this.messageProcessor = new MessageProcessor(this.roomManager, this.chatEventConnection);

    this.registerEvents();
    this.startMessageProcessing();
  }

  public static getInstance(): ChatController {
    if (!ChatController.instance) {
      ChatController.instance = new ChatController();
    }
    return ChatController.instance;
  }

  private registerEvents() {
    this.on(ChatEvents.addMessage, this.handleAddMessage);
    this.on(ChatEvents.getMessages, this.handleGetMessages);
    this.on(ChatEvents.getMessage, this.handleGetMessage);
    this.on(ChatEvents.updateMessage, this.handleUpdateMessage);
    this.on(ChatEvents.deleteMessage, this.handleDeleteMessage);
  }

  private startMessageProcessing() {
    setInterval(() => {
      const message = this.messageQueue.getNextMessage();
      if (message) {
        this.messageProcessor.process(message);
      }
    }, 1000);
  }

  private handleAddMessage = (message: IChatMessage) => {
    try{
      this.messageQueue.addMessage(message);
      this.emit(ChatEvents.addMessageResponse, message);
    }catch (err){
      this.emit(ChatEvents.addMessageError, err);
    }
  };
  private handleGetMessages = () => {

    try {
      const messages = this.messageQueue.getMessages() || [];

      console.log("Messages: " , messages)

      this.emit(ChatEvents.getMessagesResponse, messages);
    } catch (err) {
      this.emit(ChatEvents.getMessagesError, err);
    }
  };

  private handleGetMessage = (id: string) => {
    try {
      const message = this.messageQueue.getMessage(id);
      this.emit(ChatEvents.getMessageResponse, message);
    } catch (err) {
      this.emit(ChatEvents.getMessageError, err);
    }
  };

  private handleUpdateMessage = (id: string, message: string) => {
    try {
      const updatedMessage = this.messageQueue.updateMessage(id, message);
      this.emit(ChatEvents.updateMessageResponse, updatedMessage);
    } catch (err) {
      this.emit(ChatEvents.updateMessageError, err);
    }
  };

  private handleDeleteMessage = (id: string) => {
    try {
      const deletedMessage = this.messageQueue.deleteMessage(id);
      this.emit(ChatEvents.deleteMessageResponse, deletedMessage);
    } catch (err) {
      this.emit(ChatEvents.deleteMessageError, err);
    }
  };
}

export {
  ChatEvents,
  ChatController
}