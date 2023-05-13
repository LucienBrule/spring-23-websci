import {ChatEventConnection} from '@/controllers/chat/chat-event-connection';
import {Response} from 'express';

class ChatEventService {
  private static instance: ChatEventService;
  private chatEventConnection: ChatEventConnection;

  private constructor() {
    this.chatEventConnection = ChatEventConnection.getInstance();
  }

  public static getInstance(): ChatEventService {
    if (!ChatEventService.instance) {
      ChatEventService.instance = new ChatEventService();
    }
    return ChatEventService.instance;
  }

  public addClient(clientId: string, res: Response) {
    this.chatEventConnection.addClient(clientId, res);
  }

  public removeClient(clientId: string) {
    this.chatEventConnection.removeClient(clientId);
  }

  public getClientIds(): string[] {
    return this.chatEventConnection.getClientIds();
  }
}

export { ChatEventService };
