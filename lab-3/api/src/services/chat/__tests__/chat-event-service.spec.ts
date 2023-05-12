import { ChatEventService } from "../chat-event-service";

type MockResponse = {
  write?: jest.Mock;
  setHeader?: jest.Mock;
  flushHeaders?: jest.Mock;
  end?: jest.Mock;
};

describe('ChatEventService', () => {
  let chatEventService: ChatEventService;
  let mockResponse: MockResponse;

  beforeEach(() => {
    // Reset the singleton instance
    // @ts-ignore
    ChatEventService.instance = null;
    chatEventService = ChatEventService.getInstance();

    mockResponse = {
      write: jest.fn(),
      setHeader: jest.fn(),
      flushHeaders: jest.fn(),
      end: jest.fn(),
    };
  });

  it('should add a client', () => {
    const clientId = 'client1';

    chatEventService.addClient(clientId, mockResponse as any);

    // Test that the client was added
    expect(chatEventService.getClientIds()).toContain(clientId);
  });

  it('should remove a client', () => {
    const clientId = 'client1';

    chatEventService.addClient(clientId, mockResponse as any);
    chatEventService.removeClient(clientId);

    // Test that the client was removed
    expect(chatEventService.getClientIds()).not.toContain(clientId);
  });
});
