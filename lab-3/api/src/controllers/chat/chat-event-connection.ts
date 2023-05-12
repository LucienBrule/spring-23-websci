import express from "express";


interface IChatEventConnection {
  addClient(clientId: string, res: express.Response): void;
  removeClient(clientId: string): void;
  sendMessage(clientId: string, message: string): void;
  broadcastMessage(message: string): void;
}
class ChatEventConnection implements IChatEventConnection{

  private clients: Map<string, express.Response>;

  public static instance: ChatEventConnection;
  constructor() {
    this.clients = new Map();
  }

  public static getInstance(): ChatEventConnection {
    if (!ChatEventConnection.instance) {
      ChatEventConnection.instance = new ChatEventConnection();
    }
    return ChatEventConnection.instance;
  }

  public addClient(clientId: string, res: express.Response) {
    this.clients.set(clientId, res);
  }

  public removeClient(clientId: string) {
    this.clients.delete(clientId);
  }

  public sendMessage(clientId: string, message: string) {
    const client = this.clients.get(clientId);
    if (client) {
      client.write(`data: ${message}\n\n`);
    }
  }

  public broadcastMessage(message: string) {
    for (const client of this.clients.values()) {
      client.write(`data: ${message}\n\n`);
    }
  }

  getClientIds(): string[] {
    return Array.from(this.clients.keys());
  }
}

export { ChatEventConnection, IChatEventConnection };
