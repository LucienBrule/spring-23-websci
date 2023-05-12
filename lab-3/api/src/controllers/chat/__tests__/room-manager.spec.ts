import {RoomManager} from "../room-manager";
import {describe} from "node:test";

describe('RoomManager', () => {
  let roomManager: RoomManager;

  beforeEach(() => {
    roomManager = new RoomManager();
  })

  describe('joinRoom', () => {
    it('should add a user to a room', () => {
      const roomId = 'room1';
      const userId = 'user1';

      roomManager.joinRoom(roomId, userId);

      const users = roomManager.getUsersInRoom(roomId);
      expect(users).toContain(userId);
    });

    it('should add multiple users to a room', () => {
      const roomId = 'room1';
      const user1 = 'user1';
      const user2 = 'user2';
      const user3 = 'user3';

      roomManager.joinRoom(roomId, user1);
      roomManager.joinRoom(roomId, user2);
      roomManager.joinRoom(roomId, user3);

      const users = roomManager.getUsersInRoom(roomId);
      expect(users).toEqual(expect.arrayContaining([user1, user2, user3]));
    });
  });
  describe('leaveRoom', () => {
    it('should remove a user from a room', () => {
      const roomId = 'room1';
      const userId = 'user1';

      roomManager.joinRoom(roomId, userId);
      roomManager.leaveRoom(roomId, userId);

      const users = roomManager.getUsersInRoom(roomId);
      expect(users).not.toContain(userId);
    });

    it('should remove multiple users from a room', () => {
      const roomId = 'room1';
      const user1 = 'user1';
      const user2 = 'user2';
      const user3 = 'user3';

      roomManager.joinRoom(roomId, user1);
      roomManager.joinRoom(roomId, user2);
      roomManager.joinRoom(roomId, user3);
      roomManager.leaveRoom(roomId, user2);

      const users = roomManager.getUsersInRoom(roomId);
      expect(users).toEqual(expect.arrayContaining([user1, user3]));
    });

    it('should remove the room when all users leave', () => {
      const roomId = 'room1';
      const user1 = 'user1';

      roomManager.joinRoom(roomId, user1);
      roomManager.leaveRoom(roomId, user1);

      const users = roomManager.getUsersInRoom(roomId);
      expect(users).toEqual([]);
    });
  });

  describe('getUsersInRoom', () => {
    it('should return an empty array for a non-existent room', () => {
      const roomId = 'room1';

      const users = roomManager.getUsersInRoom(roomId);
      expect(users).toEqual([]);
    });

    it('should return an array of users in a room', () => {
      const roomId = 'room1';
      const user1 = 'user1';
      const user2 = 'user2';
      const user3 = 'user3';

      roomManager.joinRoom(roomId, user1);
      roomManager.joinRoom(roomId, user2);
      roomManager.joinRoom(roomId, user3);

      const users = roomManager.getUsersInRoom(roomId);
      expect(users).toEqual(expect.arrayContaining([user1, user2, user3]));
    });
  });
});