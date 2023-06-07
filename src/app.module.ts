import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [AdminModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
