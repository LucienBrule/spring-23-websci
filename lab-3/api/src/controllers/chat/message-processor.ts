import {IRoomManager, RoomManager} from './room-manager';
import {ChatMessage} from '../../models/chat';
import {ChatEventConnection, IChatEventConnection} from "./chat-event-connection";

interface IMessageProcessor {
  process(message: ChatMessage): void;
}


class MessageProcessor implements IMessageProcessor {
  private roomManager: IRoomManager;
  private chatEventConnection: IChatEventConnection;

  constructor(roomManager: IRoomManager, chatEventConnection: IChatEventConnection)
  {
    this.roomManager = roomManager;
    this.chatEventConnection = chatEventConnection;
  }

  public process(message: ChatMessage) {
    const roomId = message.roomId;
    const usersInRoom = this.roomManager.getUsersInRoom(roomId);

    // Send the message to all users in the room
    for (const userId of usersInRoom) {
      console.log(`Sending message ${message.content} to user ${userId} in room ${roomId}`);
      this.chatEventConnection.sendMessage(userId, JSON.stringify(message));
    }
  }
}

export {
  MessageProcessor,
  IMessageProcessor,
};
