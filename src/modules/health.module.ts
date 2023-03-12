import { AppController } from '@api/health/app.controller';
import { Health } from '@domain/interfaces/database/health.interface';
import { HealthService } from '@domain/services/health.service';
import { HealthResponse } from '@infra/health/health.response';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    HealthService,
    {
      provide: Health,
      useClass: HealthResponse,
    },
  ],
})
export class HealthModule {}
