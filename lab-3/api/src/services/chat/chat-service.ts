import {ChatController} from "@/controllers/chat";
import {IChatMessage} from "@/models/chat";
import {ChatEvents} from "@/models/events";


interface IChatService {
  getMessages(): Promise<IChatMessage[]>;

  addMessage(message: string): Promise<IChatMessage>;

  getMessage(id: string): Promise<IChatMessage>;

  updateMessage(id: string, message: string): Promise<IChatMessage>;

  deleteMessage(id: string): Promise<IChatMessage>;
}

class ChatService implements IChatService {
  private static instance: ChatService;

  private chatController: ChatController;

  constructor() {
    this.chatController = ChatController.getInstance();
  }

  public static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  public getMessages(): Promise<IChatMessage[]> {
    return new Promise((resolve, reject) => {
      const handleResponse = (messages: IChatMessage[]) => resolve(messages);
      const handleError = (error: Error) => reject(error);

      this.chatController.once(ChatEvents.getMessagesError, handleError)
      this.chatController.once(ChatEvents.getMessagesResponse, handleResponse);
      this.chatController.emit(ChatEvents.getMessages);
    });
  }

  public addMessage(message: string): Promise<IChatMessage> {
    return new Promise((resolve, reject) => {
      const handleResponse = (message: IChatMessage) => resolve(message);
      const handleError = (error: Error) => reject(error);

      this.chatController.once(ChatEvents.addMessageError, handleError)
      this.chatController.once(ChatEvents.addMessageResponse, handleResponse);
      this.chatController.emit(ChatEvents.addMessage, message);
    });
  }

  public getMessage(id: string): Promise<IChatMessage> {
    return new Promise((resolve, reject) => {
      const handleResponse = (message: IChatMessage) => resolve(message);
      const handleError = (error: Error) => reject(error);

      this.chatController.once(ChatEvents.getMessageError, handleError)
      this.chatController.once(ChatEvents.getMessageResponse, handleResponse);
      this.chatController.emit(ChatEvents.getMessage, id);
    });
  }

  public updateMessage(id: string, message: string): Promise<IChatMessage> {
    return new Promise((resolve, reject) => {
      const handleResponse = (message: IChatMessage) => resolve(message);
      const handleError = (error: Error) => reject(error);

      this.chatController.once(ChatEvents.updateMessageError, handleError)
      this.chatController.once(ChatEvents.updateMessageResponse, handleResponse);
      this.chatController.emit(ChatEvents.updateMessage, id, message);
    });
  }

  public deleteMessage(id: string): Promise<IChatMessage> {
    return new Promise((resolve, reject) => {
      const handleResponse = (message: IChatMessage) => resolve(message);
      const handleError = (error: Error) => reject(error);

      this.chatController.once(ChatEvents.deleteMessageError, handleError)
      this.chatController.once(ChatEvents.deleteMessageResponse, handleResponse);
      this.chatController.emit(ChatEvents.deleteMessage, id);
    });
  }
}

export {ChatService, IChatService};
