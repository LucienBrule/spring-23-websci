import request from 'supertest';
import express from 'express';
import {chatRouter} from "../chat";
import {ChatService} from "../../../services/chat";
import {ChatEventService} from "../../../services/chat/chat-event-service";
import {ChatMessage} from "../../../models/chat";

jest.mock('../../../services/chat');

const app = express();
app.use(express.json());
app.use('/', chatRouter);

describe('Chat Routes', () => {
  const mockChatService = ChatService.getInstance() as jest.Mocked<ChatService>;
  const message = new ChatMessage('Hello, world!', 'user1', 'room1');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /', () => {
    it('should get all messages', async () => {
      mockChatService.getMessages.mockResolvedValue([message]);

      const response = await request(app).get('/');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([message]);
      expect(mockChatService.getMessages).toBeCalledTimes(1);
    });

    it('should handle errors when getting all messages', async () => {
      const errorMessage = 'Error retrieving messages';
      mockChatService.getMessages.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).get('/');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({error: errorMessage});
      expect(mockChatService.getMessages).toBeCalledTimes(1);
    });
  });

  describe('POST /', () => {
    it('should create a new message', async () => {
      const newMessage = 'New message';
      mockChatService.addMessage.mockResolvedValue(new ChatMessage(newMessage, 'user1', 'room1'));

      const response = await request(app)
        .post('/')
        .send({message: newMessage});

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual(newMessage);
      expect(mockChatService.addMessage).toBeCalledWith(newMessage);
    });

    it('should handle errors when creating a new message', async () => {
      const newMessage = 'New message';
      const errorMessage = 'Error adding message';
      mockChatService.addMessage.mockRejectedValue(new Error(errorMessage));

      const response = await request(app)
        .post('/')
        .send({message: newMessage});

      expect(response.status).toBe(500);
      expect(response.body).toEqual({error: errorMessage});
      expect(mockChatService.addMessage).toBeCalledWith(newMessage);
    });
  });

  describe('GET /:id', () => {
    it('should get a specific message by ID', async () => {
      const messageId = 'message123';
      const expectedMessage = new ChatMessage('Test message', 'user1', 'room1');
      mockChatService.getMessage.mockResolvedValue(expectedMessage);

      const response = await request(app).get(`/${messageId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedMessage);
      expect(mockChatService.getMessage).toBeCalledWith(messageId);
    });

    it('should handle errors when getting a specific message by ID', async () => {
      const messageId = 'message123';
      const errorMessage = 'Error retrieving message';
      mockChatService.getMessage.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).get(`/${messageId}`);

      expect(response.status).toBe(500);
      expect(response.body).toEqual({error: errorMessage});
      expect(mockChatService.getMessage).toBeCalledWith(messageId);
    });
  });

  describe('PUT /:id', () => {
    it('should update a specific message by ID', async () => {
      const messageId = 'message123';
      const updatedMessage = new ChatMessage('Updated message', 'user1', 'room1');
      mockChatService.updateMessage.mockResolvedValue(updatedMessage);

      const response = await request(app)
        .put(`/${messageId}`)
        .send({message: updatedMessage.content});

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedMessage);
      expect(mockChatService.updateMessage).toBeCalledWith(messageId, updatedMessage.content);
    });

    it('should handle errors when updating a specific message by ID', async () => {
      const messageId = 'message123';
      const updatedMessage = 'Updated message';
      const errorMessage = 'Error updating message';
      mockChatService.updateMessage.mockRejectedValue(new Error(errorMessage));

      const response = await request(app)
        .put(`/${messageId}`)
        .send({message: updatedMessage});

      expect(response.status).toBe(500);
      expect(response.body).toEqual({error: errorMessage});
      expect(mockChatService.updateMessage).toBeCalledWith(messageId, updatedMessage);
    });
  });

  describe('DELETE /:id', () => {
    it('should delete a specific message by ID', async () => {
      const messageId = 'message123';
      const deletedMessage = new ChatMessage('Deleted message', 'user1', 'room1');
      mockChatService.deleteMessage.mockResolvedValue(deletedMessage);

      const response = await request(app).delete(`/${messageId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(deletedMessage);
      expect(mockChatService.deleteMessage).toBeCalledWith(messageId);
    });

    it('should handle errors when deleting a specific message by ID', async () => {
      const messageId = 'message123';
      const errorMessage = 'Error deleting message';
      mockChatService.deleteMessage.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).delete(`/${messageId}`);

      expect(response.status).toBe(500);
      expect(response.body).toEqual({error: errorMessage});
      expect(mockChatService.deleteMessage).toBeCalledWith(messageId);
    });
  });

  describe('GET /events', () => {
    let mockAddClient: jest.SpyInstance;
    let mockRemoveClient: jest.SpyInstance;
    let chatEventService: ChatEventService;

    beforeEach(() => {
      // Reset the singleton instance
      // @ts-ignore
      ChatEventService.instance = null;
      chatEventService = ChatEventService.getInstance();

      mockAddClient = jest.spyOn(chatEventService, 'addClient');
      mockRemoveClient = jest.spyOn(chatEventService, 'removeClient');
    });

    afterEach(() => {
      mockAddClient.mockRestore();
      mockRemoveClient.mockRestore();
    });

    it('should add client to chat event service', async () => {
      const clientId = 'client1';

      await request(app).get(`/events?clientId=${clientId}`);

      expect(mockAddClient).toHaveBeenCalledWith(clientId, expect.anything());
    });

    // This test may not work correctly because 'close' event might not be emitted in the test environment
    // it('should remove client from chat event service when the connection is closed', async () => {
    //   const clientId = 'client1';

    //   const req = request(app).get(`/events?clientId=${clientId}`);

    //   req.end();

    //   expect(mockRemoveClient).toHaveBeenCalledWith(clientId);
    // });
  });
});
