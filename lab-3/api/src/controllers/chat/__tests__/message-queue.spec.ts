import {MessageQueue} from "../message-queue";
import {IChatMessage} from "../../../models/chat";


describe('MessageQueue', () => {
  let messageQueue: MessageQueue;

  beforeEach(() => {
    messageQueue = new MessageQueue();
  });

  describe('addMessage', () => {
    it('should add a message to the queue', () => {
      const message: IChatMessage = {
        id: '1',
        content: 'Hello',
        userId: 'user1',
        roomId: 'room1',
        timestamp: new Date(),
      };

      messageQueue.addMessage(message);

      const messages = messageQueue.getMessages();
      expect(messages).toContain(message);
    });
  });

  describe('getNextMessage', () => {
    it('should retrieve the next message from the queue', () => {
      const message1: IChatMessage = {
        id: '1',
        content: 'Hello',
        userId: 'user1',
        roomId: 'room1',
        timestamp: new Date(),
      };
      const message2: IChatMessage = {
        id: '2',
        content: 'How are you?',
        userId: 'user2',
        roomId: 'room1',
        timestamp: new Date(),
      };

      messageQueue.addMessage(message1);
      messageQueue.addMessage(message2);

      const nextMessage = messageQueue.getNextMessage();
      expect(nextMessage).toEqual(message1);
    });

    it('should remove the retrieved message from the queue', () => {
      const message1: IChatMessage = {
        id: '1',
        content: 'Hello',
        userId: 'user1',
        roomId: 'room1',
        timestamp: new Date(),
      };
      const message2: IChatMessage = {
        id: '2',
        content: 'How are you?',
        userId: 'user2',
        roomId: 'room1',
        timestamp: new Date(),
      };

      messageQueue.addMessage(message1);
      messageQueue.addMessage(message2);

      messageQueue.getNextMessage();

      const messages = messageQueue.getMessages();
      expect(messages).not.toContain(message1);
    });

    it('should return undefined if the queue is empty', () => {
      const nextMessage = messageQueue.getNextMessage();
      expect(nextMessage).toBeUndefined();
    });
  });

  describe('getMessages', () => {
    it('should return all messages in the queue', () => {
      const message1: IChatMessage = {
        id: '1',
        content: 'Hello',
        userId: 'user1',
        roomId: 'room1',
        timestamp: new Date(),
      };
      const message2: IChatMessage = {
        id: '2',
        content: 'How are you?',
        userId: 'user2',
        roomId: 'room1',
        timestamp: new Date(),
      };

      messageQueue.addMessage(message1);
      messageQueue.addMessage(message2);

      const messages = messageQueue.getMessages();
      expect(messages).toEqual(expect.arrayContaining([message1, message2]));
    });
  });

  describe('getMessage', () => {
    it('should return a specific message by its ID', () => {
      const message1: IChatMessage = {
        id: '1',
        content: 'Hello',
        userId: 'user1',
        roomId: 'room1',
        timestamp: new Date(),
      };
      const message2: IChatMessage = {
        id: '2',
        content: 'How are you?',
        userId: 'user2',
        roomId: 'room1',
        timestamp: new Date()
      };

      messageQueue.addMessage(message1);
      messageQueue.addMessage(message2);

      const retrievedMessage = messageQueue.getMessage('2');
      expect(retrievedMessage).toEqual(message2);
    });

    it('should return undefined if the message with the specified ID does not exist', () => {
      const message1: IChatMessage = {
        id: '1',
        content: 'Hello',
        userId: 'user1',
        roomId: 'room1',
        timestamp: new Date(),
      };
      const message2: IChatMessage = {
        id: '2',
        content: 'How are you?',
        userId: 'user2',
        roomId: 'room1',
        timestamp: new Date(),
      };

      messageQueue.addMessage(message1);
      messageQueue.addMessage(message2);

      const retrievedMessage = messageQueue.getMessage('3');
      expect(retrievedMessage).toBeUndefined();
    });
  });

  describe('updateMessage', () => {
    it('should update the content of a message with the specified ID', () => {
      const message: IChatMessage = {
        id: '1',
        content: 'Hello',
        userId: 'user1',
        roomId: 'room1',
        timestamp: new Date(),
      };

      messageQueue.addMessage(message);

      const updatedMessage = messageQueue.updateMessage('1', 'Hi there');

      expect(updatedMessage?.content).toBe('Hi there');
    });

    it('should return the updated message', () => {
      const message: IChatMessage = {
        id: '1',
        content: 'Hello',
        userId: 'user1',
        roomId: 'room1',
        timestamp: new Date(),
      };

      messageQueue.addMessage(message);

      const updatedMessage = messageQueue.updateMessage('1', 'Hi there');

      expect(updatedMessage).toEqual(expect.objectContaining({
        id: '1',
        content: 'Hi there',
        userId: 'user1',
        roomId: 'room1',
        timestamp: expect.any(Date),
      }));
    });

    it('should return undefined if the message with the specified ID does not exist', () => {
      const message: IChatMessage = {
        id: '1',
        content: 'Hello',
        userId: 'user1',
        roomId: 'room1',
        timestamp: new Date(),
      };

      messageQueue.addMessage(message);

      const updatedMessage = messageQueue.updateMessage('2', 'Hi there');

      expect(updatedMessage).toBeUndefined();
    });
  });
  describe('deleteMessage', () => {
    it('should remove a message with the specified ID from the queue', () => {
      const message1: IChatMessage = {
        id: '1',
        content: 'Hello',
        userId: 'user1',
        roomId: 'room1',
        timestamp: new Date(),
      };
      const message2: IChatMessage = {
        id: '2',
        content: 'How are you?',
        userId: 'user2',
        roomId: 'room1',
        timestamp: new Date(),
      };

      messageQueue.addMessage(message1);
      messageQueue.addMessage(message2);

      const deletedMessage = messageQueue.deleteMessage('1');

      expect(deletedMessage).toEqual(message1);

      const messages = messageQueue.getMessages();
      expect(messages).not.toContain(message1);
    });

    it('should return undefined if the message with the specified ID does not exist', () => {
      const message1: IChatMessage = {
        id: '1',
        content: 'Hello',
        userId: 'user1',
        roomId: 'room1',
        timestamp: new Date(),
      };
      const message2: IChatMessage = {
        id: '4',
        content: 'Hello',
        userId: 'user2',
        roomId: 'room1',
        timestamp: new Date(),
      };

      messageQueue.addMessage(message1);
      messageQueue.addMessage(message2);

      const deletedMessage = messageQueue.deleteMessage('3');

      expect(deletedMessage).toBeUndefined();
    });
  });
});
