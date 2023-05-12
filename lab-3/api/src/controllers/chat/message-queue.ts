import { IChatMessage } from "../../models/chat";

interface IChatMessageQueue {
  addMessage(message: IChatMessage): void;
  getNextMessage(): IChatMessage | undefined;
  getMessages(): IChatMessage[];
  getMessage(id: string): IChatMessage | undefined;
  updateMessage(id: string, message: string): IChatMessage | undefined;
  deleteMessage(id: string): IChatMessage | undefined;
}

class MessageQueue implements IChatMessageQueue {
  private messages: Array<IChatMessage>;

  constructor() {
    this.messages = [];
  }

  public addMessage(message: IChatMessage) {
    console.log("Adding message to queue", message);
    this.messages.push(message);
  }

  public getNextMessage(): IChatMessage | undefined {
    return this.messages.shift();
  }

  public getMessages(): IChatMessage[] {
    console.log("Getting messages from queue")
    return this.messages;
  }

  public getMessage(id: string): IChatMessage | undefined {
    console.log("Getting message from queue", id);
    return this.messages.find((message) => message.id === id);
  }

  public updateMessage(id: string, messageContent: string): IChatMessage | undefined {
    const messageIndex = this.messages.findIndex((message) => message.id === id);
    if (messageIndex !== -1) {
      this.messages[messageIndex].content = messageContent;
      return this.messages[messageIndex];
    }
    return undefined;
  }

  public deleteMessage(id: string): IChatMessage | undefined {
    const messageIndex = this.messages.findIndex((message) => message.id === id);
    if (messageIndex !== -1) {
      const deletedMessage = this.messages[messageIndex];
      this.messages.splice(messageIndex, 1);
      return deletedMessage;
    }
    return undefined;
  }
}

export {
  IChatMessageQueue,
  MessageQueue,
};
