import {
    Controller,
    Post,
    Body,
    Get,
    Req,
    Param,
    Res
} from '@nestjs/common';
import { Response } from 'express';
import IRequestAuthUser from 'src/Patterns/Interfaces/IResquestAuthUser';
import ResponseSuccess from 'src/Responses/ResponseSuccess';
import DownloadDriveService from 'src/Services/Drives/DownloadDriveService';
import DriveListingService from 'src/Services/Drives/DriveListingService';
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
        @Req() request: IRequestAuthUser,
        @Res() response: Response
    ): void{
        const uploadDriveService: UploadDriveService = new UploadDriveService(this.dataSource);

        uploadDriveService.execute({
            ...bodyRequest,
            user: request.authUser
        });

        let responseJson: ResponseSuccess = new ResponseSuccess();

        response
            .status(responseJson.statusCode)
            .json(responseJson);
    }

    @Get(':driveUuid')
    async download(
        @Req() request: IRequestAuthUser,
        @Param('driveUuid') driveUuid: string,
        @Res() response: Response
    ): Promise<void>{

        const downloadDriveService: DownloadDriveService = new DownloadDriveService(this.dataSource);

        let stream: Readable = 
            await downloadDriveService.execute({
                driveUuid,
                user: request.authUser
            });

        stream.pipe(response);
    }

    @Get()
    async listing(
        @Req() request: IRequestAuthUser,
        @Res() response: Response
    ){

        const driveListingService: DriveListingService = new DriveListingService(this.dataSource);

        let drives: any[] = 
            await driveListingService
                    .execute(({ user: request.authUser }))
                    .then((data) => {
                        return data
                                    .map(({ filename, id_uuid: uuid })=> {
                                        return {
                                            filename,
                                            uuid
                                        }
                                    });
                    });

        let responseJson: ResponseSuccess = new ResponseSuccess({ data: drives });

        response
            .status(responseJson.statusCode)
            .json(responseJson);
    }
}