import { EmailSender } from '@domain/interfaces/events/emails.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SendEmailService implements EmailSender {
  constructor() {}
  sendEmail(body: any, user: string) {
    console.log({
      body,
      user,
    });
  }
}
