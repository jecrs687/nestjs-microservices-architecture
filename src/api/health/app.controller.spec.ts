import { Health } from '@domain/interfaces/services/health.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from '../../domain/services/health.service';
import { HealthResponse } from '../../infra/health/health.response';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        HealthService,
        {
          provide: Health,
          useClass: HealthResponse,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('OK');
    });
  });
});
