import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AdminService } from "./admin.service";

@Controller('admin')
export class AdminController{

    constructor(private readonly adminService: AdminService){}
    @Get('/index')
    getIndex(): any {
    return this.adminService.getIndex();
    }
@Get('/search/:id')
getAdminById(@Param() id:number): any {
return this.adminService.getAdminById(id);
}
@Post('/addadmin')
addAdmin(@Body() data:object):object {
return this.adminService.addAdmin(data);
}

}