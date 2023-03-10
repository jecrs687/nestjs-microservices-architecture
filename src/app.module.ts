import { Health } from '@domain/interfaces/services/health.interface';
import { HealthService } from '@domain/services/health.service';
import { Module } from '@nestjs/common';
import { AppController } from './api/health/app.controller';
import { HealthResponse } from './infra/health/health.response';

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
export class AppModule {}
