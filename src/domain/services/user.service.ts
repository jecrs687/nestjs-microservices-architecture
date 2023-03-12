import { UserEntity } from '@domain/entities/user.entity';
import { UserRepository } from '@domain/interfaces/database/user.interface';
import { EmailSender } from '@domain/interfaces/events/emails.interface';
import { RabbitMq } from '@domain/interfaces/events/rabbitMq.interface';
import { ReqResClient } from '@domain/interfaces/gateway/reqres.interface';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly reqResClient: ReqResClient,
    private readonly emailSender: EmailSender,
    private readonly rabbitMq: RabbitMq,
  ) {}
  public async getUser(id: string): Promise<UserEntity> {
    const userMemory = await this.userRepository.getUser(id);
    if (!userMemory) {
      const { data } = await this.reqResClient.get(
        this.reqResClient.endpoints.getUser(id),
      );
      if (!data) throw new NotFoundException('user not found');
      const userDto = await this.userRepository.postUser(data as UserEntity);
      return userDto;
    }
    return userMemory;
  }
  public async postUser(user: Omit<UserEntity, 'id'>): Promise<UserEntity> {
    const userDb = await this.userRepository.postUser(user);
    const { data } = await this.reqResClient.post(
      this.reqResClient.endpoints.createUser(),
      user,
    );
    this.emailSender.sendEmail('welcome to plataform', user.email);
    this.rabbitMq.emiteEvent({
      type: 'user.created',
      payload: data,
    });

    return userDb as UserEntity;
  }
  public async removeAvatar(user: string): Promise<boolean> {
    return await this.userRepository.removeAvatar(user);
  }
}
