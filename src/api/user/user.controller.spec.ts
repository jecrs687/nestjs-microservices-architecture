import { UserFactory } from '@infra/factory/user.factory';
import { UserModule } from '@modules/user.module';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
      controllers: [],
      providers: [],
    }).compile();

    userController = app.get<UserController>(UserController);
  });

  describe('root', () => {
    it('should create and return a user"', async () => {
      const userInserted = await userController.postUser(
        UserFactory.createPartial(),
      );
      const user = await userController.getUser({ id: userInserted.id });
      const { id, ...userDto } = userInserted;
      const { id: id2, ...userDto2 } = user;
      expect(userDto).toStrictEqual(userDto2);
    });
  });
});
