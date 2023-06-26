import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, Request, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminDTO, AdminUpdateDTO } from "./admin.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";


@Controller('admin')
export class AdminController {

    constructor(private readonly adminService: AdminService) { }
    @Get('/index')
    getIndex(): any {
        return this.adminService.getIndex();
    }
    @Get('/search/:id')
    getAdminById(@Param('id', ParseIntPipe) id: number): object {
        return this.adminService.getAdminById(id);
    }
    @Get('/search')
    getAdminbyIDAndName(@Query() qry: any): object {

        return this.adminService.getAdminbyIDAndName(qry.id, qry.name);
    }

    @Post('/addadmin')
    @UsePipes(new ValidationPipe())
    addAdmin(@Body() data: AdminDTO): object {
        return this.adminService.addAdmin(data);
    }

    @Put('/updateadmin')
    //@UsePipes(new ValidationPipe())
    updateAdmin(@Body() data: AdminUpdateDTO): object {
        return this.adminService.updateAdmin(data);
    }
    @Put('/updateadmin/:id')
    @UsePipes(new ValidationPipe())
    updateAdminbyID(@Param() id: number, @Body() data: AdminDTO): object {
        return this.adminService.updateAdminById(id, data);
    }

    @Post(('/upload'))
    @UseInterceptors(FileInterceptor('myfile',
        {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                    cb(null, true);
                else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                }
            },
            limits: { fileSize: 30000 },
            storage: diskStorage({
                destination: './uploads',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname)
                },
            })
        }
    ))
    uploadFile(@UploadedFile() myfileobj: Express.Multer.File): object {
        console.log(myfileobj)
        return ({ message: "file uploaded" });
    }

    @Get('/getimage/:name')
    getImages(@Param('name') name, @Res() res) {
        res.sendFile(name, { root: './uploads' })
    }

    @Post('/addmanager')
    addManagers(@Body() manager) {
        console.log(manager);
        return this.adminService.addManager(manager);
    }
    @Get('/getmanager/:adminid')
    getManagers(@Param('adminid', ParseIntPipe) adminid:number) {
       
        return this.adminService.getManager(adminid);
    }

@Post('/signup')
@UseInterceptors(FileInterceptor('image',
        {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                    cb(null, true);
                else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                }
            },
            limits: { fileSize: 30000 },
            storage: diskStorage({
                destination: './uploads',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname)
                },
            })
        }
    ))
    @UsePipes(new ValidationPipe)
signup(@Body() mydata:AdminDTO,@UploadedFile() imageobj: Express.Multer.File){
console.log(mydata);
console.log(imageobj.filename);
mydata.filenames = imageobj.filename;
return this.adminService.signup(mydata);

}

@Post('/signin')
signIn(@Body() data:AdminDTO){
    return this.adminService.signIn(data);
}

@Get('getimagebyadminid/:adminId')
async getimagebyid(@Param('adminId', ParseIntPipe) adminId:number, @Res() res){
    const filename = await this.adminService.getimagebyadminid(adminId);
    res.sendFile(filename, { root: './uploads' })

}




}




