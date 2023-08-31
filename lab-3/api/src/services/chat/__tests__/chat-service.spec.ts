import {ChatService} from "@/services";
import {ChatController} from "@/controllers/chat";
import {ChatMessage} from "@/models/chat";
import {ChatEvents} from "@/models/events";
jest.mock('@/controllers/chat', () => {
  const mockChatController = {
    emit: jest.fn(),
    once: jest.fn()
  };
  return {
    ChatController: {
      getInstance: jest.fn(() => mockChatController),
    }
  };
});

describe('ChatService', () => {
  let actualChatService: ChatService;
  let mockChatController: jest.Mocked<ChatController>;
  let message: ChatMessage;

  beforeEach(() => {
    actualChatService = ChatService.getInstance() as ChatService;
    mockChatController = ChatController.getInstance() as jest.Mocked<ChatController>;
    message = new ChatMessage('Hello, world!', 'user1', 'room1');
  });

  describe('getMessages', () => {
    it('should call emit with the correct event', async () => {
      // Mock the once method to immediately call the event handler
      mockChatController.once.mockImplementation((event, handler) => {
        if (event === ChatEvents.getMessagesResponse) {
          // Call the handler with some mock data
          handler([]);
        }
        return mockChatController;
      });

      await actualChatService.getMessages();
      expect(mockChatController.emit).toHaveBeenCalledWith(ChatEvents.getMessages);
    });
  });

  describe('addMessage', () => {
    it('should call emit with the correct event and message', async () => {
      // Mock the once method to immediately call the event handler
      mockChatController.once.mockImplementation((event, handler) => {
        if (event === ChatEvents.addMessageResponse) {
          // Call the handler with some mock data
          handler(message);
        }
        return mockChatController;
      });

      await actualChatService.addMessage(message.content);
      expect(mockChatController.emit).toHaveBeenCalledWith(ChatEvents.addMessage, message.content);
    });
  });

  describe('getMessage', () => {
    it('should call emit with the correct event and id', async () => {
      // Mock the once method to immediately call the event handler
      mockChatController.once.mockImplementation((event, handler) => {
        if (event === ChatEvents.getMessageResponse) {
          // Call the handler with some mock data
          handler(message);
        }
        return mockChatController;
      });

      await actualChatService.getMessage('1');
      expect(mockChatController.emit).toHaveBeenCalledWith(ChatEvents.getMessage, '1');
    });
  });

  describe('updateMessage', () => {
    it('should call emit with the correct event, id, and message', async () => {
      // Mock the once method to immediately call the event handler
      mockChatController.once.mockImplementation((event, handler) => {
        if (event === ChatEvents.updateMessageResponse) {
          // Call the handler with some mock data
          handler(message);
        }
        return mockChatController;
      });

      await actualChatService.updateMessage('1', message.content);
      expect(mockChatController.emit).toHaveBeenCalledWith(ChatEvents.updateMessage, '1', message.content);
    });
  });

  describe('deleteMessage', () => {
    it('should call emit with the correct event and id', async () => {
      // Mock the once method to immediately call the event handler
      mockChatController.once.mockImplementation((event, handler) => {
        if (event === ChatEvents.deleteMessageResponse) {
          // Call the handler with some mock data
          handler(message);
        }
        return mockChatController;
      });

      await actualChatService.deleteMessage('1');
      expect(mockChatController.emit).toHaveBeenCalledWith(ChatEvents.deleteMessage, '1');
    });
  });
});
