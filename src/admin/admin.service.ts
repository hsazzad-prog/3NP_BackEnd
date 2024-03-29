import { Injectable } from "@nestjs/common";
import { AdminDTO, AdminLoginDTO, AdminUpdateDTO } from "./admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "./admin.entity";
import { Repository } from "typeorm";
import { ManagerEntity } from "../manager/manager.entity";
import * as bcrypt from 'bcrypt'
import { MailerService } from "@nestjs-modules/mailer/dist";


@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminEntity)
        private adminRepo: Repository<AdminEntity>,
        @InjectRepository(ManagerEntity)
        private managerRepo: Repository<ManagerEntity>,
        private mailobject: MailerService
    ) { }
    async getIndex(): Promise<AdminEntity[]> {
        return this.adminRepo.find();
    }
    async getAdminById(id: number): Promise<AdminEntity> {
        return this.adminRepo.findOneBy({ id });
    }

    async getAdminByEmail(email: string): Promise<AdminEntity> {
        return this.adminRepo.findOneBy({ email: email });
    }
    async getAdminbyIDAndName(id, name): Promise<AdminEntity> {
        return this.adminRepo.findOneBy({ id: id, name: name });
    }

    async addAdmin(data: AdminDTO): Promise<AdminEntity> {
        return this.adminRepo.save(data);
    }

    async updateAdmin(email: string, data: AdminUpdateDTO): Promise<AdminEntity> {
        await this.adminRepo.update({ email: email }, data);
        return this.adminRepo.findOneBy({ id: data.id });
    }
    async updateAdminById(id: number, data: AdminDTO): Promise<AdminEntity> {
        await this.adminRepo.update(id, data);
        return this.adminRepo.findOneBy({ id });
    }

    async deleteUser(id: number): Promise<AdminEntity[]> {
        await this.adminRepo.delete(id);
        return this.adminRepo.find();
    }

    async addManager(manager): Promise<ManagerEntity> {
        return this.managerRepo.save(manager);
    }

    async getAllManagers(): Promise<ManagerEntity[]> {
        return this.managerRepo.find();
    }
    async getAllManagerswithadmin(): Promise<ManagerEntity[]> {
        return this.managerRepo.find(
            {
                relations: {
                    admin: true
                }
            }
        );
    }
    async getManagersByAdmin(adminid: number): Promise<AdminEntity[]> {
        return this.adminRepo.find({
            where: { id: adminid },
            relations: {
                managers: true,
            },
        });
    }

    async signup(data: AdminDTO): Promise<AdminEntity> {
        const salt = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password, salt);
        return this.adminRepo.save(data);
    }

    async getimagebyadminid(adminid: number): Promise<string> {
        const mydata: AdminDTO = await this.adminRepo.findOneBy({ id: adminid });
        console.log(mydata);
        return mydata.filenames;
    }

    async signIn(data: AdminLoginDTO): Promise<boolean> {
        console.log("data" + { data });
        const userdata: AdminLoginDTO = await this.adminRepo.findOneBy({ email: data.email });
        console.log(userdata);
        if (userdata != null) {
            const match: boolean = await bcrypt.compare(data.password, userdata.password);
            return match;
        }
        else {
            return false;
        }
    }
    async sendEmail() {

        return await this.mailobject.sendMail({
            to: 'receiver’s email',
            subject: 'subject of email',
            text: 'text to receiver',
        });

    }


}


