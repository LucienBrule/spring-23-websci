interface IRoomManager {
  joinRoom(roomId: string, userId: string): void;
  leaveRoom(roomId: string, userId: string): void;
  getUsersInRoom(roomId: string): string[];
}
class RoomManager implements IRoomManager {
  private rooms: Record<string, string[]>;

  constructor() {
    this.rooms = {};
  }

  public joinRoom(roomId: string, userId: string) {
    if (!this.rooms[roomId]) {
      this.rooms[roomId] = [];
    }
    this.rooms[roomId].push(userId);
  }

  public leaveRoom(roomId: string, userId: string) {
    if (this.rooms[roomId]) {
      this.rooms[roomId] = this.rooms[roomId].filter((id) => id !== userId);
      if (this.rooms[roomId].length === 0) {
        delete this.rooms[roomId];
      }
    }
  }

  public getUsersInRoom(roomId: string): string[] {
    return this.rooms[roomId] || [];
  }
}

export { IRoomManager, RoomManager };