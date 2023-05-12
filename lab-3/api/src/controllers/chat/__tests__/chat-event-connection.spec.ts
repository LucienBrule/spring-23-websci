import { ChatEventConnection } from '../chat-event-connection';
import express from 'express';

describe('ChatEventConnection', () => {
  let chatEventConnection: ChatEventConnection;
  let mockResponse: express.Response;

  beforeEach(() => {
    // Reset the singleton instance
    // @ts-ignore
    ChatEventConnection.instance = null;
    chatEventConnection = ChatEventConnection.getInstance();

    // Create a mock Response object
    mockResponse = {
      write: jest.fn(),
    } as unknown as express.Response;
  });

  describe('addClient', () => {
    it('should add a client to the clients map', () => {
      const clientId = 'client1';

      chatEventConnection.addClient(clientId, mockResponse);

      // @ts-ignore
      expect(chatEventConnection.clients.has(clientId)).toBe(true);
    });
  });

  describe('removeClient', () => {
    it('should remove a client from the clients map', () => {
      const clientId = 'client1';

      chatEventConnection.addClient(clientId, mockResponse);
      chatEventConnection.removeClient(clientId);

      // @ts-ignore
      expect(chatEventConnection.clients.has(clientId)).toBe(false);
    });
  });

  describe('sendMessage', () => {
    it('should send a message to the specified client', () => {
      const clientId = 'client1';
      const message = 'Hello, world!';

      chatEventConnection.addClient(clientId, mockResponse);
      chatEventConnection.sendMessage(clientId, message);

      expect(mockResponse.write).toHaveBeenCalledWith(`data: ${message}\n\n`);
    });
  });

  describe('broadcastMessage', () => {
    it('should send a message to all clients', () => {
      const clients = ['client1', 'client2', 'client3'];
      const message = 'Hello, world!';

      clients.forEach((clientId) => {
        chatEventConnection.addClient(clientId, mockResponse);
      });

      chatEventConnection.broadcastMessage(message);

      expect(mockResponse.write).toHaveBeenCalledTimes(clients.length);
      expect(mockResponse.write).toHaveBeenCalledWith(`data: ${message}\n\n`);
    });
  });
});
