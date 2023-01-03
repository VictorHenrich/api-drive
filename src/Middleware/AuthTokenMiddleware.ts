import {
    Injectable,
    NestMiddleware
} from '@nestjs/common';
import UnreportedAuthError from 'src/Exceptions/UnreportedAuthError';
import User from 'src/Models/User';
import ResponseUnauthorized from 'src/Responses/ResponseUnauthorized';
import UserAuthTokenService from 'src/Services/Users/UserAuthTokenService';
import { DataSource } from 'typeorm';
import { Request, Response } from 'express';




@Injectable()
export default class AuthTokenMiddleware implements NestMiddleware{
    constructor(
        private dataSource: DataSource
    ){

    }

    async use(request: Request, response: Response, next: (error?: any) => void) {
        let user: User;

        try{
            const userAuthTokenService = new UserAuthTokenService(this.dataSource);

            const token: string = request.headers.authorization;

            if(!token)
                throw new UnreportedAuthError();

            user = await userAuthTokenService.execute({ token: token });
            
        }catch(error){
            const responseObject = new ResponseUnauthorized({ data: error.message });

            return response
                        .status(responseObject.statusCode)
                        .json(responseObject);
        }
        
        request['authUser'] = user;

        next();
    }

}