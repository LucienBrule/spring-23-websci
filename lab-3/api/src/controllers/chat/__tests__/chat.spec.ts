
import {ChatMessage} from "@/models/chat";
import {ChatEventConnection} from "@/controllers/chat/chat-event-connection";
import {ChatEvents} from "@/models/events";
import {MessageQueue} from "@/controllers/chat/message-queue";
import {ChatController} from "@/controllers/chat";
import express from "express";

jest.mock('../message-queue');
jest.mock('../room-manager');
jest.mock('../message-processor');
jest.mock('../chat-event-connection');
jest.mock('../chat-event-connection', () => ({
  ChatEventConnection: {
    getInstance: jest.fn(() => ({
      sendMessage: jest.fn(),
      // Add any other methods you want to mock here
    })),
  },
}));



describe('ChatController', () => {
  let chatController: ChatController;
  let message: ChatMessage;
  let messageQueue: MessageQueue;

  beforeEach(() => {
    // Reset the singleton instance
    // @ts-ignore
    ChatController.instance = null;
    chatController = ChatController.getInstance();

    message = new ChatMessage('Hello, world!', 'user1', 'room1');
    messageQueue = new MessageQueue();

  });

  it('should emit addMessageResponse event when addMessage event is triggered', () => {
    const spy = jest.spyOn(chatController, 'emit');

    chatController.emit(ChatEvents.addMessage, message);

    expect(spy).toHaveBeenCalledWith(ChatEvents.addMessageResponse, message);
  });

  it('should emit getMessagesResponse event when getMessages event is triggered', () => {
    const spy = jest.spyOn(chatController, 'emit');

    chatController.emit(ChatEvents.getMessages);

    expect(spy).toHaveBeenCalledWith(ChatEvents.getMessagesResponse, expect.any(Array));
  });

  it('should emit getMessageResponse event when getMessage event is triggered with a valid message id', () => {
    const spy = jest.spyOn(chatController, 'emit');
    const messageId = 'message1';

    chatController.emit(ChatEvents.getMessage, messageId);

    expect(spy).toHaveBeenCalledWith(ChatEvents.getMessageResponse, expect.any(ChatMessage));
  });

  it('should emit getMessageError event when getMessage event is triggered with an invalid message id', () => {
    const spy = jest.spyOn(chatController, 'emit');
    const messageId = 'invalidMessageId';

    chatController.emit(ChatEvents.getMessage, messageId);

    expect(spy).toHaveBeenCalledWith(ChatEvents.getMessageError, expect.any(Error));
  });

  it('should emit updateMessageResponse event when updateMessage event is triggered with a valid message id', () => {
    const spy = jest.spyOn(chatController, 'emit');
    const messageId = 'message1';
    const updatedMessage = 'Updated message';

    chatController.emit(ChatEvents.updateMessage, messageId, updatedMessage);

    expect(spy).toHaveBeenCalledWith(ChatEvents.updateMessageResponse, expect.any(ChatMessage));
  });

  it('should emit updateMessageError event when updateMessage event is triggered with an invalid message id', () => {
    const spy = jest.spyOn(chatController, 'emit');
    const messageId = 'invalidMessageId';
    const updatedMessage = 'Updated message';

    chatController.emit(ChatEvents.updateMessage, messageId, updatedMessage);

    expect(spy).toHaveBeenCalledWith(ChatEvents.updateMessageError, expect.any(Error));
  });

  it('should emit deleteMessageResponse event when deleteMessage event is triggered with a valid message id', () => {
    const spy = jest.spyOn(chatController, 'emit');
    const messageId = 'message1';

    chatController.emit(ChatEvents.deleteMessage, messageId);

    expect(spy).toHaveBeenCalledWith(ChatEvents.deleteMessageResponse, expect.any(ChatMessage));
  });

  it('should emit deleteMessageError event when deleteMessage event is triggered with an invalid message id', () => {
    const spy = jest.spyOn(chatController, 'emit');
    const messageId = 'invalidMessageId';

    chatController.emit(ChatEvents.deleteMessage, messageId);

    expect(spy).toHaveBeenCalledWith(ChatEvents.deleteMessageError, expect.any(Error));
  });

  it('should process messages in the queue', (done) => {
    jest.spyOn(ChatEventConnection.prototype, 'sendMessage').mockImplementation();

    console.log("The test is running...")

    console.log('chatEventConnection instance:', chatController['chatEventConnection']);

    chatController.emit(ChatEvents.startMessageProcessing);
    chatController.emit(ChatEvents.addMessage, message);

    setTimeout(() => {
      expect(ChatEventConnection.prototype.sendMessage).toHaveBeenCalledWith('user1', JSON.stringify(message));
      done();
    }, 1100);
  });

  it('should emit addMessageError event when an error occurs while adding a message', () => {
    const spy = jest.spyOn(chatController, 'emit');
    const errorMessage = 'Error adding message';

    jest.spyOn(messageQueue, 'addMessage').mockImplementation(() => {
      throw new Error(errorMessage);
    });

    chatController.emit(ChatEvents.addMessage, message);

    expect(spy).toHaveBeenCalledWith(ChatEvents.addMessageError, expect.any(Error));
  });

  it('should emit getMessagesError event when an error occurs while retrieving messages', () => {
    const spy = jest.spyOn(chatController, 'emit');
    const errorMessage = 'Error getting messages';

    jest.spyOn(messageQueue, 'getMessages').mockImplementation(() => {
      throw new Error(errorMessage);
    });

    chatController.emit(ChatEvents.getMessages);

    expect(spy).toHaveBeenCalledWith(ChatEvents.getMessagesError, expect.any(Error));
  });

  it('should emit getMessageError event when an error occurs while retrieving a message', () => {
    const spy = jest.spyOn(chatController, 'emit');
    const errorMessage = 'Error getting message';
    const messageId = 'message1';

    jest.spyOn(messageQueue, 'getMessage').mockImplementation(() => {
      throw new Error(errorMessage);
    });

    chatController.emit(ChatEvents.getMessage, messageId);

    expect(spy).toHaveBeenCalledWith(ChatEvents.getMessageError, expect.any(Error));
  });

  it('should emit updateMessageError event when an error occurs while updating a message', () => {
    const spy = jest.spyOn(chatController, 'emit');
    const errorMessage = 'Error updating message';
    const messageId = 'message1';
    const updatedMessage = 'Updated message';

    jest.spyOn(messageQueue, 'updateMessage').mockImplementation(() => {
      throw new Error(errorMessage);
    });

    chatController.emit(ChatEvents.updateMessage, messageId, updatedMessage);

    expect(spy).toHaveBeenCalledWith(ChatEvents.updateMessageError, expect.any(Error));
  });

  it('should emit deleteMessageError event when an error occurs while deleting a message', () => {
    const spy = jest.spyOn(chatController, 'emit');
    const errorMessage = 'Error deleting message';
    const messageId = 'message1';

    jest.spyOn(messageQueue, 'deleteMessage').mockImplementation(() => {
      throw new Error(errorMessage);
    });

    chatController.emit(ChatEvents.deleteMessage, messageId);

    expect(spy).toHaveBeenCalledWith(ChatEvents.deleteMessageError, expect.any(Error));
  });
});
