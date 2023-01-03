import {
    Controller,
    Post,
    Body,
    Get
} from '@nestjs/common';
import BaseResponse from 'src/Responses/BaseResponse';
import ResponseSuccess from 'src/Responses/ResponseSuccess';
import UploadFileService from 'src/Services/Drives/UploadFileService';
import { DataSource } from 'typeorm';




interface BodyUploadFile{
    content: string,
    filename: string
}


@Controller('drive')
export default class DriveController{

    constructor(
        private dataSource: DataSource
    ){

    }

    @Post()
    upload(@Body() bodyRequest: BodyUploadFile): BaseResponse{
        const uploadFileService: UploadFileService = new UploadFileService(this.dataSource);

        uploadFileService.execute(bodyRequest);

        return new ResponseSuccess();
    }

    @Get()
    download(@Body() bodyRequest: BodyUploadFile): BaseResponse{
        const uploadFileService: UploadFileService = new UploadFileService(this.dataSource);

        uploadFileService.execute(bodyRequest);

        return new ResponseSuccess();
    }
}