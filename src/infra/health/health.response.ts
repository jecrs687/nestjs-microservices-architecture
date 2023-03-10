import { Health } from '@domain/interfaces/services/health.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthResponse implements Health {
  getHealth(): string {
    return 'OK';
  }
}
