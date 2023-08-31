
jest.mock('@/services/chat', () => {
  const mockChatService: IChatService = {
    getMessages: jest.fn(),
    addMessage: jest.fn(),
    getMessage: jest.fn(),
    updateMessage: jest.fn(),
    deleteMessage: jest.fn(),
  }

  return {
    ChatService: {
      getInstance: jest.fn().mockImplementation(() => {
        return mockChatService;
      })
    }
  }
});


jest.mock('@/controllers/chat/chat-event-connection', () => {
  return {
    ChatEventConnection: {
      getInstance: jest.fn().mockImplementation(() => {
        return {
          addClient: jest.fn(),
          removeClient: jest.fn(),
          getClientIds: jest.fn().mockReturnValue([]),
        };
      }),
    },
  };
});

jest.mock('@/services/chat/chat-event-service', () => {
  let instance: any;

  return {
    ChatEventService: {
      getInstance: jest.fn().mockImplementation(() => {
        if (!instance) {
          instance = {
            addClient: jest.fn().mockImplementation((clientId: string, res: Response) => {}),
            removeClient: jest.fn(),
            getClientIds: jest.fn().mockReturnValue([]),
          };
        }
        return instance;
      }),
    },
  };
});

import request from 'supertest';
import express from 'express';
import {chatRouter} from "../chat-route";
import {ChatService, IChatService} from "@/services";
import {ChatEventService} from "@/services";
import {ChatMessage, IChatMessage} from "@/models/chat";
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
      // expect(response.body).toEqual([message]);
      // expect(mockChatService.getMessages).toBeCalledTimes(1);
    });

    it('should handle errors when getting all messages', async () => {

    });
  });

  describe('POST /', () => {
    it('should create a new message', async () => {
      mockChatService.addMessage.mockResolvedValue(message);
      const response = await request(app).post('/').send({message: message.content});
      expect(response.status).toBe(200);

      const receivedMessage = response.body as IChatMessage;
      expect(receivedMessage.content).toEqual(message.content);
      expect(mockChatService.addMessage).toBeCalledWith(message.content);

    });

    it('should handle errors when creating a new message', async () => {
      const newMessage = 'New message';
      const errorMessage = 'Error adding message';
      mockChatService.addMessage.mockRejectedValue(new Error(errorMessage));

      const response = await request(app)
        .post('/')
        .send({message: newMessage});

      expect(response.status).toBe(500);
      // expect(response.body).toEqual({error: errorMessage});
      // expect(mockChatService.addMessage).toBeCalledWith(newMessage);
    });
  });

  describe('GET /:id', () => {
    it('should get a specific message by ID', async () => {

    });

    it('should handle errors when getting a specific message by ID', async () => {

    });
  });

  describe('PUT /:id', () => {
    it('should update a specific message by ID', async () => {
    });

    it('should handle errors when updating a specific message by ID', async () => {
    });
  });

  describe('DELETE /:id', () => {
    it('should delete a specific message by ID', async () => {
    });

    it('should handle errors when deleting a specific message by ID', async () => {

    });
  });
});
