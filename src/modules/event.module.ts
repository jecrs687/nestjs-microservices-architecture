import { EmailSender } from '@domain/interfaces/events/emails.interface';
import { RabbitMq } from '@domain/interfaces/events/rabbitMq.interface';
import { RabbitMqService } from '@infra/events/rabbitMq.events';
import { SendEmailService } from '@infra/events/sendEmail.evemts';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'cats_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: RabbitMq,
      useClass: RabbitMqService,
    },
    {
      provide: EmailSender,
      useClass: SendEmailService,
    },
  ],
})
export class EventModule {}
