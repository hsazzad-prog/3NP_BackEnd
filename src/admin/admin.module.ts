import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { AdminEntity, AdminProfile } from "./admin.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ManagerEntity } from "src/manager/manager.entity";
import { MailerModule } from "@nestjs-modules/mailer";


@Module({
    imports: [TypeOrmModule.forFeature([AdminEntity, AdminProfile,
        ManagerEntity]),
    MailerModule.forRoot({
        transport: {
            host: 'smtp.gmail.com',
            port: 465,
            ignoreTLS: true,
            secure: true,
            auth: {
                user: 'sazzad.utm@gmail.com',
                pass: 'kkqkunuhchyspyrw'
            },
        }
    })

    ],
    controllers: [AdminController],
    providers: [AdminService]
})

export class AdminModule { }