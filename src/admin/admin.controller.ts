import { Body, Controller, Get, Param, Post, Query, Request, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminDTO } from "./admin.dto";

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
@Get('/search')
getAdminbyName(@Query() qry:AdminDTO): string {

return this.adminService.getAdminByName(qry);
}

@Post('/addadmin')
@UsePipes(new ValidationPipe())
addAdmin(@Body() data:AdminDTO):string {
    console.log(data);
return this.adminService.addAdmin(data);
}

}


