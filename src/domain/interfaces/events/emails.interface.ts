export abstract class EmailSender {
  abstract sendEmail: (body: any, user: string) => void;
}
