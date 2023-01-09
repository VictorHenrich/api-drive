import { 
    Controller,
    Body,
    Post,
    Res,
    Put
} from '@nestjs/common';
import { Response } from 'express';
import ExpiredTokenError from 'src/Exceptions/ExpiredTokenError';
import UserNotFoundError from 'src/Exceptions/UserNotFoundError';
import ResponseFailure from 'src/Responses/ResponseFailure';
import ResponseSuccess from 'src/Responses/ResponseSuccess';
import UserAuthLoginService from 'src/Services/Users/UserAuthLoginService';
import UserAuthRefreshTokenService from 'src/Services/Users/UserAuthRefreshTokenService';
import { DataSource } from 'typeorm';


interface UserAuthBody{
    email: string,
    password: string
}

interface UserAuthRefreshToken{
    token: string
}


@Controller('auth')
export default class UserAuthController{
    constructor(
        private dataSource: DataSource
    ){

    }

    @Post()
    async authUserLogin(
        @Body() bodyRequest: UserAuthBody, 
        @Res() response: Response
    ): Promise<void>{
        try{
            const userAuthLoginService = new UserAuthLoginService(this.dataSource);

            let token: string = await userAuthLoginService.execute({ ...bodyRequest });

            let responseJson: ResponseSuccess = new ResponseSuccess({ data: token });

            response
                .status(responseJson.statusCode)
                .json(responseJson);

        }catch(error){
            let responseJsonError: ResponseFailure = new ResponseFailure({ data: error.message });

            if(error instanceof UserNotFoundError)
                response
                    .status(responseJsonError.statusCode)
                    .json(responseJsonError);

            else
                throw error;
        }
    }

    @Put()
    async refreshToken(
        @Body() bodyRequest: UserAuthRefreshToken, 
        @Res() response: Response
    ){
        try{
            const userAuthRefreshToken = new UserAuthRefreshTokenService(this.dataSource);

            let token: string = await userAuthRefreshToken.execute({ ...bodyRequest });

            let responseJson: ResponseSuccess = new ResponseSuccess({ data: token });

            response
                .status(responseJson.statusCode)
                .json(responseJson);

        }catch(error){
            let responseJsonError: ResponseFailure = new ResponseFailure({ data: error.message });

            if(error instanceof UserNotFoundError || error instanceof ExpiredTokenError)
                response
                    .status(responseJsonError.statusCode)
                    .json(responseJsonError);

            else
                throw error;
        }
    }
}