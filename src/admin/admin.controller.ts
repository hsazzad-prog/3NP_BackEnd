import { Body, Controller, Get, Param, Post, Put, Query, Request, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminDTO, AdminUpdateDTO } from "./admin.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";


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

@Put('/updateadmin')
//@UsePipes(new ValidationPipe())
updateAdmin(@Body() data:AdminUpdateDTO): object{
    return this.adminService.updateAdmin(data);
}
@Put('/updateadmin/:id')
@UsePipes(new ValidationPipe())
updateAdminbyID(@Param() id:number,@Body() data:AdminDTO): object{
    return this.adminService.updateAdminById(id,data);
}

@Post(('/upload'))
@UseInterceptors(FileInterceptor('myfile',
{ fileFilter: (req, file, cb) => {
    if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
     cb(null, true);
    else {
    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
    }
    },
    limits: { fileSize: 30000 },
    storage:diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
    cb(null,Date.now()+file.originalname)
    },
    })
    }
))
uploadFile(@UploadedFile() myfileobj: Express.Multer.File):object
{
 console.log(myfileobj)   
return ({message:"file uploaded"});
}

@Get('/getimage/:name')
getImages(@Param('name') name, @Res() res) {
 res.sendFile(name,{ root: './uploads' })
 }





}




