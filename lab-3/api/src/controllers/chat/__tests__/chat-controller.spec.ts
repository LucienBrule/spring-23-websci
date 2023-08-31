import {ChatController} from "@/controllers/chat";
import {ChatEvents} from "@/models/events";
import {MessageQueue} from "@/controllers/chat/message-queue";
import {RoomManager} from "@/controllers/chat/room-manager";
import {MessageProcessor} from "@/controllers/chat/message-processor";
import {ChatEventConnection} from "@/controllers/chat/chat-event-connection";
import {ChatMessage, IChatMessage} from "@/models/chat";

jest.mock('@/controllers/chat/message-queue');
jest.mock('@/controllers/chat/room-manager');
jest.mock('@/controllers/chat/message-processor', () => {
  const mockMessageProcessor = {
    process: jest.fn(),
  }
  return {
    MessageProcessor: jest.fn(() => mockMessageProcessor),
  }
})

jest.mock('@/controllers/chat/chat-event-connection', () => {
  const mockChatEventConnection = {
    addClient: jest.fn(),
    removeClient: jest.fn(),
    sendMessage: jest.fn(),
    broadcastMessage: jest.fn(),
    getClientIds: jest.fn(),
  }
  return {
    ChatEventConnection: {
      getInstance: jest.fn(() => mockChatEventConnection)
    },
  }
});

describe('ChatController', () => {
  let chatController: ChatController;
  let mockMessageQueue: jest.Mocked<MessageQueue>;
  let mockRoomManager: jest.Mocked<RoomManager>;
  let mockMessageProcessor: jest.Mocked<MessageProcessor>;
  let mockChatEventConnection: jest.Mocked<ChatEventConnection>;
  let message: IChatMessage;
  beforeEach(() => {
    chatController = ChatController.getInstance();
    mockMessageQueue = new MessageQueue() as jest.Mocked<MessageQueue>;
    mockRoomManager = new RoomManager() as jest.Mocked<RoomManager>;
    mockMessageProcessor = new MessageProcessor(mockRoomManager, mockChatEventConnection) as jest.Mocked<MessageProcessor>;
    mockChatEventConnection = ChatEventConnection.getInstance() as jest.Mocked<ChatEventConnection>;
    message = new ChatMessage('Hello, world!', 'user1', 'room1')
  });

  // TODO: Add test here for startMessageProcessing
  describe('startMessageProcessing', () => {
    it('should start processing messages', () => {

      mockMessageQueue.getNextMessage.mockReturnValue(message);
      chatController.emit(ChatEvents.startMessageProcessing)
      expect(mockMessageProcessor.process).toHaveBeenCalledWith(message);

    });
  });

  // TODO: Add test here for stopMessageProcessing
  describe('stopMessageProcessing', () => {
    it('should stop processing messages', () => {
      // TODO: Implement test
    });
  });

  // TODO: Add test here for handleAddMessage
  describe('handleAddMessage', () => {
    it('should handle adding a message', () => {
      // TODO: Implement test
    });
  });

  // TODO: Add test here for handleGetMessages
  describe('handleGetMessages', () => {
    it('should handle getting messages', () => {
      // TODO: Implement test
    });
  });

  // TODO: Add test here for handleGetMessage
  describe('handleGetMessage', () => {
    it('should handle getting a message by id', () => {
      // TODO: Implement test
    });
  });

  // TODO: Add test here for handleUpdateMessage
  describe('handleUpdateMessage', () => {
    it('should handle updating a message', () => {
      // TODO: Implement test
    });
  });

  // TODO: Add test here for handleDeleteMessage
  describe('handleDeleteMessage', () => {
    it('should handle deleting a message', () => {
      // TODO: Implement test
    });
  });
});
