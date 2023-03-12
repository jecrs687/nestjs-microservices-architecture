import { UserEntity } from '@domain/entities/user.entity';
import { EmailSender } from '@domain/interfaces/events/emails.interface';
import { RabbitMq } from '@domain/interfaces/events/rabbitMq.interface';
import { ReqResClient } from '@domain/interfaces/gateway/reqres.interface';
import { UserRepository } from '@domain/interfaces/services/user.interface';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(ReqResClient)
    private readonly reqResClient: ReqResClient,
    @Inject(EmailSender)
    private readonly emailSender: EmailSender,
    @Inject(RabbitMq)
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
    await this.userRepository.postUser(user);
    const { data } = await this.reqResClient.post(
      this.reqResClient.endpoints.createUser(),
      user,
    );
    this.emailSender.sendEmail('welcome to plataform', user.email);
    this.rabbitMq.emiteEvent({
      type: 'user.created',
      payload: data,
    });

    return data as UserEntity;
  }
  public async removeAvatar(user: string): Promise<boolean> {
    return await this.userRepository.removeAvatar(user);
  }
}
