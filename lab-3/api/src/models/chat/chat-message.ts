import {v4 as generateUUID} from 'uuid';
interface IChatMessage {
  content: string;
  userId: string;
  roomId: string;
  timestamp: Date;
  id?: string

}

class ChatMessage implements IChatMessage{
  public content: string;
  public userId: string;
  public roomId: string;
  public timestamp: Date;
  public id?: string;

  constructor(content: string, userId: string, roomId: string) {
    this.content = content;
    this.userId = userId;
    this.roomId = roomId;
    this.timestamp = new Date();
    this.id = generateUUID();
  }
}

export { ChatMessage, IChatMessage };