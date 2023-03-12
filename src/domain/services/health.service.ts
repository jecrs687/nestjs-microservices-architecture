import { Health } from '@domain/interfaces/database/health.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  constructor(
    @Inject(Health)
    private readonly health: Health,
  ) {}
  getHealth(): string {
    return this.health.getHealth();
  }
}
