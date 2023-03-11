export interface RabbitMq {
  emiteEvent: (body: any) => void;
}
export const RabbitMq = Symbol('RabbitMq');
