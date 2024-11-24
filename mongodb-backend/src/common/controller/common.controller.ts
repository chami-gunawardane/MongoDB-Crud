import { Body, Controller, Put, Request, Get, Post, Query, Param, UseInterceptors, ClassSerializerInterceptor, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CommonService } from '../service/common.service';
import { v4 as uuid } from 'uuid';

@Controller('common')
export class CommonController {
    constructor(
        private readonly commonService: CommonService,
    ) { }


    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file1: Express.Multer.File, @Body() body): Promise<any> {

        const fileName: string = uuid();
        const result1 = (await this.commonService.uploadFile(file1, fileName + "_student")).Location;

        return {
            status: 200,
            description: "File uploaded successfully",
            data: result1
        };
    }


}


