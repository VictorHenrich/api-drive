import {
    Controller,
    Post,
    Body,
    Get,
    Req,
    Param,
    Res,
    StreamableFile,
    Delete,
    Put
} from '@nestjs/common';
import { Response } from 'express';
import IRequestAuthUser from 'src/Patterns/Interfaces/IResquestAuthUser';
import ResponseFailure from 'src/Responses/ResponseFailure';
import ResponseSuccess from 'src/Responses/ResponseSuccess';
import DownloadDriveService from 'src/Services/Drives/DownloadDriveService';
import DriveExclusionService from 'src/Services/Drives/DriveExclusionService';
import DriveListingService from 'src/Services/Drives/DriveListingService';
import DriveUpdateService from 'src/Services/Drives/DriveUpdateService';
import UploadDriveService from 'src/Services/Drives/UploadDriveService';
import { Readable } from 'stream';
import { DataSource } from 'typeorm';




interface BodyUploadFile{
    content: string,
    filename: string
}

interface BodyUpdateFile{
    filename: string
}


@Controller('drive')
export default class DriveController{

    constructor(
        private dataSource: DataSource
    ){

    }

    @Post()
    async upload(
        @Body() bodyRequest: BodyUploadFile,
        @Req() request: IRequestAuthUser,
        @Res() response: Response
    ): Promise<void>{
        const uploadDriveService: UploadDriveService = new UploadDriveService(this.dataSource);

        await uploadDriveService.execute({
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

    @Get()
    async listing(
        @Req() request: IRequestAuthUser,
        @Res() response: Response
    ): Promise<any>{

        try{
            const driveListingService: DriveListingService = new DriveListingService(this.dataSource);

            let drives: any[] = 
                await driveListingService
                        .execute(({ user: request.authUser }))
                        .then((data) => {
                            return data
                                        .map(({ filename, id_uuid: uuid, filetype })=> {
                                            return {
                                                filename: `${filename}.${filetype}`,
                                                uuid
                                            }
                                        });
                        });

            let responseJson: ResponseSuccess = new ResponseSuccess({ data: drives });

            return response
                        .status(responseJson.statusCode)
                        .json(responseJson);

        }catch(error){
            let responseErrorJson: ResponseSuccess = new ResponseSuccess({ data: error.message });

            return response
                        .status(responseErrorJson.statusCode)
                        .json(responseErrorJson);
        }
    }

    @Delete(':driveUuid')
    async remove(
        @Req() request: IRequestAuthUser,
        @Res() response: Response,
        @Param('driveUuid') driveUUID: string
    ):Promise<any>{
        try{
            const driveExclusionService = new DriveExclusionService(this.dataSource);

            await driveExclusionService.execute({ driveUUID, user: request.authUser });

            let responseJson: ResponseSuccess = new ResponseSuccess();

            return response
                        .status(responseJson.statusCode)
                        .json(responseJson);
                
        }catch(error){
            let responseErrorJson: ResponseFailure = new ResponseFailure({ data: error.message });

            return response
                        .status(responseErrorJson.statusCode)
                        .json(responseErrorJson);
        }
    }

    @Put(":driveUuid")
    async update(
        @Req() request: IRequestAuthUser,
        @Res() response: Response,
        @Body() { filename }: BodyUpdateFile,
        @Param('driveUuid') driveUUID: string
    ): Promise<any>{
        try{

            const driveUpdateService = new DriveUpdateService(this.dataSource);

            await driveUpdateService.execute({ 
                driveUUID,
                filename,
                user: request.authUser,
            });

            let responseJson: ResponseSuccess = new ResponseSuccess();

            return response
                        .status(responseJson.statusCode)
                        .json(responseJson);

        }catch(error){
            let responseErrorJson: ResponseFailure = new ResponseFailure({ data: error.message });

            return response
                        .status(responseErrorJson.statusCode)
                        .json(responseErrorJson);
        }
    }
}