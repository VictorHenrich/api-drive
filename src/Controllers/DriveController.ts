import {
    Controller,
    Post,
    Body,
    Get,
    Req,
    Param,
    StreamableFile
} from '@nestjs/common';
import IRequestAuthUser from 'src/Patterns/Interfaces/IResquestAuthUser';
import BaseResponse from 'src/Responses/BaseResponse';
import ResponseSuccess from 'src/Responses/ResponseSuccess';
import DownloadDriveService from 'src/Services/Drives/DownloadDriveService';
import UploadDriveService from 'src/Services/Drives/UploadDriveService';
import { Readable } from 'stream';
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
    upload(
        @Body() bodyRequest: BodyUploadFile,
        @Req() request: IRequestAuthUser
    ): BaseResponse{
        const uploadDriveService: UploadDriveService = new UploadDriveService(this.dataSource);

        uploadDriveService.execute({
            ...bodyRequest,
            user: request.authUser
        });

        return new ResponseSuccess();
    }

    @Get(':driveUuid')
    async download(
        @Req() request: IRequestAuthUser,
        @Param('driveUuid') driveUuid: string
    ): Promise<StreamableFile>{

        const downloadDriveService: DownloadDriveService = new DownloadDriveService(this.dataSource);

        let stream: Readable = 
            await downloadDriveService.execute({
                driveUuid,
                user: request.authUser
            });

        return new StreamableFile(stream);
    }
}