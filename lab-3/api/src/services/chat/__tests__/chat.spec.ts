import {ChatService} from '@/services/chat';
import {ChatMessage, IChatMessage} from "@/models/chat";
import {ChatController} from "@/controllers/chat";
import {ChatEvents} from "@/models/events";

jest.mock('@/controllers/chat', () => {
  return {
    ChatController: {
      getInstance: jest.fn().mockReturnValue({
        emit: jest.fn(),
        once: jest.fn(),
      }),
    },
  };
});
describe('ChatService', () => {
  let chatService: ChatService;
  let chatController: jest.Mocked<ChatController>;
  let message: ChatMessage;

  beforeEach(() => {
    // Reset the singleton instance
    // @ts-ignore
    ChatService.instance = null;
    chatService = ChatService.getInstance();
    chatController = ChatController.getInstance() as jest.Mocked<ChatController>;
    message = new ChatMessage('Hello, world!', 'user1', 'room1');
  });

  describe('getMessages', () => {
    it('should call emit with the correct arguments', async () => {
      await chatService.getMessages();

      expect(chatController.emit).toHaveBeenCalledWith(ChatEvents.getMessages);
    });

    it('should call once with the correct events for response handling', async () => {
      const responsePromise = chatService.getMessages();

      expect(chatController.once).toHaveBeenCalledWith(
        ChatEvents.getMessagesResponse,
        expect.any(Function)
      );

      const responseHandler = chatController.once.mock.calls[0][1];
      const response: IChatMessage[] = [message];

      responseHandler(response);

      const result = await responsePromise;
      expect(result).toEqual(response);
    });

    it('should call once with the correct events for error handling', async () => {
      const errorPromise = chatService.getMessages();

      expect(chatController.once).toHaveBeenCalledWith(ChatEvents.getMessagesError, expect.any(Function));

      const errorHandler = chatController.once.mock.calls[1][1];
      const error = new Error('Failed to get messages');

      errorHandler(error);

      await expect(errorPromise).rejects.toThrow(error);
    });
  });

  describe('addMessage', () => {
    it('should call emit with the correct arguments', async () => {
      await chatService.addMessage('New message');

      expect(chatController.emit).toHaveBeenCalledWith(ChatEvents.addMessage, 'New message');
    });

    it('should call once with the correct events for response handling', async () => {
      const responsePromise = chatService.addMessage('New message');

      expect(chatController.once).toHaveBeenCalledWith(ChatEvents.addMessageResponse, expect.any(Function));

      const responseHandler = chatController.once.mock.calls[2][1];
      const response: IChatMessage = message;

      responseHandler(response);

      const result = await responsePromise;
      expect(result).toEqual(response);
    });

    it('should call once with the correct events for error handling', async () => {
      const errorPromise = chatService.addMessage('New message');

      expect(chatController.once).toHaveBeenCalledWith(ChatEvents.addMessageError, expect.any(Function));

      const errorHandler = chatController.once.mock.calls[3][1];
      const error = new Error('Failed to add message');

      errorHandler(error);

      await expect(errorPromise).rejects.toThrow(error);
    });
  });

  // Add similar tests for getMessage, updateMessage, deleteMessage methods...

  describe('getMessage', () => {
    it('should call emit with the correct arguments', async () => {
      const messageId = 'message1';

      await chatService.getMessage(messageId);

      expect(chatController.emit).toHaveBeenCalledWith(ChatEvents.getMessage, messageId);
    });

    it('should call once with the correct events for response handling', async () => {
      const messageId = 'message1';
      const responsePromise = chatService.getMessage(messageId);

      expect(chatController.once).toHaveBeenCalledWith(
        ChatEvents.getMessageResponse,
        expect.any(Function)
      );

      const responseHandler = chatController.once.mock.calls[4][1];
      const response: IChatMessage = message;

      responseHandler(response);

      const result = await responsePromise;
      expect(result).toEqual(response);
    });

    it('should call once with the correct events for error handling', async () => {
      const messageId = 'message1';
      const errorPromise = chatService.getMessage(messageId);

      expect(chatController.once).toHaveBeenCalledWith(ChatEvents.getMessageError, expect.any(Function));

      const errorHandler = chatController.once.mock.calls[5][1];
      const error = new Error('Failed to get message');

      errorHandler(error);

      await expect(errorPromise).rejects.toThrow(error);
    });
  });

  describe('updateMessage', () => {
    it('should call emit with the correct arguments', async () => {
      const messageId = 'message1';
      const updatedMessage = 'Updated message';

      await chatService.updateMessage(messageId, updatedMessage);

      expect(chatController.emit).toHaveBeenCalledWith(
        ChatEvents.updateMessage,
        messageId,
        updatedMessage
      );
    });

    it('should call once with the correct events for response handling', async () => {
      const messageId = 'message1';
      const updatedMessage = 'Updated message';
      const responsePromise = chatService.updateMessage(messageId, updatedMessage);

      expect(chatController.once).toHaveBeenCalledWith(
        ChatEvents.updateMessageResponse,
        expect.any(Function)
      );

      const responseHandler = chatController.once.mock.calls[6][1];
      const response: IChatMessage = message;

      responseHandler(response);

      const result = await responsePromise;
      expect(result).toEqual(response);
    });

    it('should call once with the correct events for error handling', async () => {
      const messageId = 'message1';
      const updatedMessage = 'Updated message';
      const errorPromise = chatService.updateMessage(messageId, updatedMessage);

      expect(chatController.once).toHaveBeenCalledWith(
        ChatEvents.updateMessageError,
        expect.any(Function)
      );

      const errorHandler = chatController.once.mock.calls[7][1];
      const error = new Error('Failed to update message');

      errorHandler(error);

      await expect(errorPromise).rejects.toThrow(error);
    });
  });
  describe('deleteMessage', () => {
    it('should call emit with the correct arguments', async () => {
      const messageId = 'message1';

      await chatService.deleteMessage(messageId);

      expect(chatController.emit).toHaveBeenCalledWith(ChatEvents.deleteMessage, messageId);
    });

    it('should call once with the correct events for response handling', async () => {
      const messageId = 'message1';
      const responsePromise = chatService.deleteMessage(messageId);

      expect(chatController.once).toHaveBeenCalledWith(
        ChatEvents.deleteMessageResponse,
        expect.any(Function)
      );

      const responseHandler = chatController.once.mock.calls[8][1];
      const response: IChatMessage = message;

      responseHandler(response);

      const result = await responsePromise;
      expect(result).toEqual(response);
    });

    it('should call once with the correct events for error handling', async () => {
      const messageId = 'message1';
      const errorPromise = chatService.deleteMessage(messageId);

      expect(chatController.once).toHaveBeenCalledWith(
        ChatEvents.deleteMessageError,
        expect.any(Function)
      );

      const errorHandler = chatController.once.mock.calls[9][1];
      const error = new Error('Failed to delete message');

      errorHandler(error);

      await expect(errorPromise).rejects.toThrow(error);
    });
  });
});
