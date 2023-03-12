import { TransformInterceptor } from '@decorators/interceptor.decorator';
import { HealthService } from '@domain/services/health.service';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@UseInterceptors(TransformInterceptor)
@ApiTags('Health')
@Controller()
export class AppController {
  constructor(private readonly appService: HealthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHealth();
  }
}
