import { HealthService } from '@domain/services/health.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: HealthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHealth();
  }
}
