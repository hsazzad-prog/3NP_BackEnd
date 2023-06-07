import { Injectable } from "@nestjs/common";


@Injectable()
export class AdminService{

    getIndex(): string{
        return "Hellow Aadmin";
    }
    getAdminById(id: number): object{
    return ({id: 2, name: "abc", age:30});
    }
    addAdmin(data: object)
    {
        return data;
    }



}