import {EventEmitter} from "events";
import {IChatMessage} from "@/models/chat";
import {IChatMessageQueue, MessageQueue} from './message-queue';
import {IRoomManager, RoomManager} from './room-manager';
import {IMessageProcessor, MessageProcessor} from './message-processor';
import {ChatEventConnection, IChatEventConnection} from "./chat-event-connection";
import {ChatEvents} from "@/models/events";
import assert from "assert";


class ChatController extends EventEmitter{

  public static instance: ChatController;
  private messageQueue: IChatMessageQueue;
  private roomManager: IRoomManager;
  private messageProcessor: IMessageProcessor;
  private chatEventConnection: IChatEventConnection;
  private processingInterval: NodeJS.Timeout | null = null;


  constructor() {
    super();

    this.messageQueue = new MessageQueue();
    this.roomManager = new RoomManager();
    this.chatEventConnection = ChatEventConnection.getInstance()

    assert(this.chatEventConnection !== undefined, 'ChatEventConnection is not initialized');
    this.messageProcessor = new MessageProcessor(this.roomManager, this.chatEventConnection);

    this.registerEvents();
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
    this.on(ChatEvents.startMessageProcessing, this.startMessageProcessing);
    this.on(ChatEvents.stopMessageProcessing, this.stopMessageProcessing);
  }


  private startMessageProcessing = () => {
    this.processingInterval = setInterval(() => {
      const message = this.messageQueue.getNextMessage();
      if (message) {
        this.messageProcessor.process(message);
      }
    }, 1000);
  };

  private stopMessageProcessing = () => {
    if (this.processingInterval) {
      clearInterval(this.processingInterval);
      this.processingInterval = null;
    }
  };


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
      const messages = this.messageQueue.getMessages();
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
  ChatController
}