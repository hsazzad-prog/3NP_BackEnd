import { Injectable } from "@nestjs/common";
import { AdminDTO, AdminUpdateDTO } from "./admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "./admin.entity";
import { Repository } from "typeorm";
import { ManagerEntity } from "src/manager/manager.entity";

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminEntity)
        private adminRepo: Repository<AdminEntity>,
        @InjectRepository(ManagerEntity)
        private managerRepo: Repository<ManagerEntity>
    ) { }
    async getIndex(): Promise<AdminEntity[]> {
        return this.adminRepo.find();
    }
    async getAdminById(id: number): Promise<AdminEntity> {
        return this.adminRepo.findOneBy({ id });
    }

    async getAdminbyIDAndName(id, name): Promise<AdminEntity> {
        return this.adminRepo.findOneBy({ id: id, name: name });
    }

    async addAdmin(data: AdminDTO): Promise<AdminEntity> {
        return this.adminRepo.save(data);
    }

    async updateAdmin(data: AdminUpdateDTO): Promise<AdminEntity> {
        await this.adminRepo.update(data.id, data);
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
    async getManagersByAdmin(adminid: number): Promise<AdminEntity[]> {
        return this.adminRepo.find({
            where: { id: adminid },
            relations: {
                managers: true,
            },
        });
    }




}
