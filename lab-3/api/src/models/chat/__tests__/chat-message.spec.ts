import {ChatMessage} from "../chat-message";
import {describe} from "node:test";

describe('ChatMessage', () => {
  it('should create a new ChatMessage with generated ID', () => {
    const content = 'Hello World!';
    const userId = 'user123';
    const roomId = 'room456';

    const message = new ChatMessage(content, userId, roomId);

    expect(message.content).toEqual(content);
    expect(message.userId).toEqual(userId);
    expect(message.roomId).toEqual(roomId);
    expect(message.timestamp).toBeInstanceOf(Date);
    expect(message.id).toBeDefined();

  })
})