import { 
    Controller,
    Body,
    Post
} from '@nestjs/common';
import UserNotFoundError from 'src/Exceptions/UserNotFoundError';
import BaseResponse from 'src/Responses/BaseResponse';
import ResponseFailure from 'src/Responses/ResponseFailure';
import ResponseSuccess from 'src/Responses/ResponseSuccess';
import UserAuthLoginService from 'src/Services/Users/UserAuthLoginService';
import { DataSource } from 'typeorm';


interface UserAuthBody{
    email: string,
    password: string
}


@Controller('auth')
export default class UserAuthController{
    constructor(
        private dataSource: DataSource
    ){

    }

    @Post()
    async authUserLogin(@Body() bodyRequest: UserAuthBody): Promise<BaseResponse>{
        try{
            const userAuthLoginService = new UserAuthLoginService(this.dataSource);

            let token: string = await userAuthLoginService.execute({ ...bodyRequest });

            return new ResponseSuccess({ data: token });
        }catch(error){
            if(error instanceof UserNotFoundError)
                return new ResponseFailure({ data: error.message });

            else
                throw error;
        }
    }
}