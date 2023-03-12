export abstract class RabbitMq {
  abstract emiteEvent: (body: any) => void;
}
