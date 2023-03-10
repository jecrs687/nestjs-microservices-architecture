import { UserEntity } from '@domain/entities/user.entity';
import { UserRepository } from '@domain/interfaces/services/user.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}
  public async getUser(): Promise<UserEntity> {
    const user = await this.userRepository.getUser();
    return user;
  }
  public async postUser(): Promise<UserEntity> {
    const user = await this.userRepository.postUser();
    return user;
  }
}
