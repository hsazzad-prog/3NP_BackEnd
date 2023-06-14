import { Injectable } from "@nestjs/common";
import { AdminDTO, AdminUpdateDTO } from "./admin.dto";


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

    updateAdmin(data: AdminUpdateDTO): object
    {
console.log(data.id);
console.log(data.name);
        return data;
    }

    updateAdminById(id:number,data: AdminDTO): object
    {
console.log(id);
console.log(data);
        return data;
    }




}