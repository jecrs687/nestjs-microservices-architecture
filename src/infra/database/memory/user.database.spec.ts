import { UserFactory } from '../../factory/user.factory';
import { UserRepositoryMemory } from './user.database';

describe('UserRepositoryMemory', () => {
  let userRepositoryMemory: UserRepositoryMemory;
  let userFactory: UserFactory;

  beforeEach(() => {
    userRepositoryMemory = new UserRepositoryMemory();
  });

  describe('getUser', () => {
    it('should return the user with the given id', async () => {
      const user = UserFactory.createPartial({
        email: 'john@doe.com',
      });

      userRepositoryMemory.postUser(user);
      const result = await userRepositoryMemory.getUser(user.id);

      expect(result).toEqual(user);
    });

    it('should return undefined if the user does not exist', async () => {
      const result = await userRepositoryMemory.getUser('non-existent-id');

      expect(result).toBeUndefined();
    });
  });

  describe('removeAvatar', () => {
    it('should set the avatar to null if the user exists', async () => {
      const user = UserFactory.createPartial({
        first_name: 'John Doe',
        email: 'john@doe.com',
        avatar: 'avatar.jpg',
      });
      userRepositoryMemory.postUser(user);

      const result = await userRepositoryMemory.removeAvatar(user.id);
      const userDto = await userRepositoryMemory.getUser(user.id);

      expect(result).toBe(true);
      expect(userDto.avatar).toBeNull();
    });

    it('should return false if the user does not exist', async () => {
      const result = await userRepositoryMemory.removeAvatar('non-existent-id');

      expect(result).toBe(false);
    });
  });
});
