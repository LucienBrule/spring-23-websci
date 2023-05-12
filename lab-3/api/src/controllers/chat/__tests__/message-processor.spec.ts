import { MessageProcessor, IMessageProcessor } from '../message-processor';
import { IRoomManager } from '../room-manager';
import { IChatEventConnection } from '../chat-event-connection';
import { ChatMessage } from '../../../models/chat';

describe('MessageProcessor', () => {
  let messageProcessor: IMessageProcessor;
  let roomManager: IRoomManager;
  let chatEventConnection: IChatEventConnection;

  beforeEach(() => {
    roomManager = {
      joinRoom: jest.fn(),
      leaveRoom: jest.fn(),
      getUsersInRoom: jest.fn(),
    };

    chatEventConnection = {
      addClient: jest.fn(),
      removeClient: jest.fn(),
      sendMessage: jest.fn(),
      broadcastMessage: jest.fn(),
    };

    messageProcessor = new MessageProcessor(roomManager, chatEventConnection);
  });

  describe('process', () => {
    it('should send the message to all users in the room', () => {
      const message: ChatMessage = {
        content: 'Hello, world!',
        userId: 'user1',
        roomId: 'room1',
        timestamp: new Date(),
      };

      const usersInRoom = ['user1', 'user2', 'user3'];

      roomManager.getUsersInRoom = jest.fn().mockReturnValue(usersInRoom);

      messageProcessor.process(message);

      expect(chatEventConnection.sendMessage).toHaveBeenCalledTimes(usersInRoom.length);
      expect(chatEventConnection.sendMessage).toHaveBeenCalledWith('user1', JSON.stringify(message));
      expect(chatEventConnection.sendMessage).toHaveBeenCalledWith('user2', JSON.stringify(message));
      expect(chatEventConnection.sendMessage).toHaveBeenCalledWith('user3', JSON.stringify(message));
    });
  });
});
