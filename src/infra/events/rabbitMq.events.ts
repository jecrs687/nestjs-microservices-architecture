import { RabbitMq } from '@domain/interfaces/events/rabbitMq.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RabbitMqService implements RabbitMq {
  constructor() {}
  emiteEvent(body: any) {
    console.log(body);
  }
}
