import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, Request, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, Session, UseGuards, HttpException, HttpStatus, UnauthorizedException, Req } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminDTO, AdminLoginDTO, AdminUpdateDTO } from "./admin.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import session from "express-session";
import { SessionGuard } from "./session.guards";
import { AdminEntity } from "./admin.entity";
import { ManagerEntity } from "src/manager/manager.entity";


@Controller('admin')
export class AdminController {

    constructor(private readonly adminService: AdminService) { }

    @UseGuards(SessionGuard)
    @Get('/index')
    getIndex(): any {
        return this.adminService.getIndex();
    }
    @Get('/search/:id')
    async getAdminById(@Param('id', ParseIntPipe) id: number): Promise<AdminEntity> {
        const res = await this.adminService.getAdminById(id);
        if (res !== null) {
            return await this.adminService.getAdminById(id);
        }
        else {
            throw new HttpException("Admin not found", HttpStatus.NOT_FOUND);
        }
    }
    @Get('/getuser/:email')
    async getAdminByEmail(email: string): Promise<AdminEntity> {
        const res = await this.adminService.getAdminByEmail(email);
        if (res !== null) {
            return await this.adminService.getAdminByEmail(email);
        }
        else {
            throw new HttpException("Admin not found", HttpStatus.NOT_FOUND);
        }
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
    @UseGuards(SessionGuard)

    //@UsePipes(new ValidationPipe())
    updateAdmin(@Body() data: AdminUpdateDTO, @Session() session): object {
        console.log(session.email);
        return this.adminService.updateAdmin(session.email, data);
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

    @Get('/getallmanager')
    getAllManagers(): Promise<ManagerEntity[]> {
        return this.adminService.getAllManagers()
    }
    @Get('/getallmanagerwithadmin')
    getAllManagersWithAdmin(): Promise<ManagerEntity[]> {
        return this.adminService.getAllManagerswithadmin()
    }


    @Post('/addmanager')
    addManagers(@Body() manager) {
        console.log(manager);
        return this.adminService.addManager(manager);
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
    signup(@Body() mydata: AdminDTO, @UploadedFile() imageobj: Express.Multer.File) {
        console.log(mydata);
        console.log(imageobj.filename);
        mydata.filenames = imageobj.filename;
        return this.adminService.signup(mydata);

    }

    @Get('getimagebyadminid/:adminId')
    async getimagebyid(@Param('adminId', ParseIntPipe) adminId: number, @Res() res) {
        const filename = await this.adminService.getimagebyadminid(adminId);
        res.sendFile(filename, { root: './uploads' })
    }
    @Post('signin')
    signIn(@Body() mydata: AdminLoginDTO, @Session() session) {
        const result = this.adminService.signIn(mydata);
        if (result) {
            session.email = mydata.email;
            console.log(session.email);
        }

        return result;
    }

    @Post('/signout')
    signout( @Req() req) {
        if (req.session.destroy()) {
            return true;
        }
        else {
            throw new UnauthorizedException("invalid actions");
        }
    }



}




