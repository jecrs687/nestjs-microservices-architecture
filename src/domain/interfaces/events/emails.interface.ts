export interface EmailSender {
  sendEmail: (body: any, user: string) => void;
}
export const EmailSender = Symbol('EmailSender');
