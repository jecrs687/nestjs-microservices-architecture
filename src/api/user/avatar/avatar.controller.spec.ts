import { ReqResClient } from '@domain/interfaces/gateway/reqres.interface';
import { UserFactory } from '@infra/factory/user.factory';
import { UserModule } from '@modules/user.module';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { AvatarController } from './avatar.controller';

describe('UserController', () => {
  let userController: UserController;
  let avatarController: AvatarController;
  let reqres: ReqResClient;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
      controllers: [],
      providers: [],
    }).compile();

    userController = app.get<UserController>(UserController);
    avatarController = app.get<AvatarController>(AvatarController);
    reqres = app.get<ReqResClient>(ReqResClient);
  });

  describe('root', () => {
    it('should create user and get the avatar"', async () => {
      const userInserted = await userController.postUser(
        UserFactory.createPartial(),
      );
      const image = await avatarController.getUserAvatar({
        id: userInserted.id,
      });
      expect(image).toBeDefined();
    });
    it('should create user and delete avatar"', async () => {
      const userInserted = await userController.postUser(
        UserFactory.createPartial(),
      );
      await avatarController.getUserAvatar({ id: userInserted.id });
      await avatarController.deleteUserAvatar({ id: userInserted.id });
      const avatar = avatarController.getUserAvatar({ id: userInserted.id });
      const error = new NotFoundException('Avatar not found');
      expect(avatar).rejects.toThrowError(error);
    });
  });
});
