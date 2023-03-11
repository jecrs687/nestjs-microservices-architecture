import { HealthModule } from '@modules/health.module';
import { Module } from '@nestjs/common';
import { EventModule } from './modules/event.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [EventModule, UserModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
