import { Injectable } from "@nestjs/common";
import { AdminDTO } from "./admin.dto";


@Injectable()
export class AdminService{

    getIndex(): string{
        return "Hellow Aadmin";
    }
    getAdminById(id: number): object{
    return ({id: 2, name: "abc", age:30});
    }
    getAdminByName(mydata: AdminDTO): string{
    return mydata.name;
    }

    addAdmin(data: AdminDTO): string
    {
        return data.email;
    }



}