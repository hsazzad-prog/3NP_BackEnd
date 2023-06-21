import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AdminModule, TypeOrmModule.forRoot(
    { type: 'postgres',
     host: 'localhost',
     port: 5432,
     username: 'postgres',
     password: 'root',
     database: '3NP_Project',//Change to your database name
     autoLoadEntities: true,
     synchronize: true,
     } ),
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
