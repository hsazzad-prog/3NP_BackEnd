import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { AdminAdress, AdminEntity, AdminProfile } from "./admin.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ManagerEntity } from "../manager/manager.entity";


@Module({
    imports: [ TypeOrmModule.forFeature([AdminEntity, AdminProfile, AdminAdress,ManagerEntity]),
      
  ],
    controllers: [AdminController],
    providers: [AdminService],
  })
  export class AdminModule {}