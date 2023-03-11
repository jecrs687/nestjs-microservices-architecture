import { UserFactory } from '@infra/factory/user.factory';
import { UserModule } from '@modules/user.module';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { AvatarController } from './avatar.controller';

describe('UserController', () => {
  let userController: UserController;
  let avatarController: AvatarController;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
      controllers: [],
      providers: [],
    }).compile();

    userController = app.get<UserController >(UserController);
    avatarController = app.get<AvatarController>(AvatarController);

  });

  describe('root', () => {
    it('should create user and get the avatar"', async () => {
        const userInserted = await userController.postUser(UserFactory.createPartial());
        const image = await avatarController.getUserAvatar({id: userInserted.id});
        expect(image).toBeDefined();
    });
    it('should create user and delete avatar"', async () => {
        const userInserted = await userController.postUser(UserFactory.createPartial());
        await avatarController.deleteUserAvatar({id: userInserted.id});
        const image = await avatarController.getUserAvatar({id: userInserted.id});

        expect(image).toBeUndefined();
      });

  });
});
