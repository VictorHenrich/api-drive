import {
    Controller,
    Post,
    Req,
    Header,
    Request
} from '@nestjs/common';
import BaseResponse from 'src/Responses/BaseResponse';
import ResponseSuccess from 'src/Responses/ResponseSuccess';
import UploadFileService from 'src/Services/UploadFileService';



@Controller('upload')
export default class UploadFileController{

    @Post()
    @Header("Content-Type", "application/json")
    async uploadFile(@Req() request: Request): Promise<BaseResponse>{
        const data: any = request.body;

        const uploadFileService: UploadFileService = new UploadFileService();

        uploadFileService.execute(data);

        return new ResponseSuccess();
    }
}