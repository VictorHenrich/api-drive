import { 
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Req,
    Res
} from '@nestjs/common';
import { Response } from 'express';
import IRequestAuthUser from 'src/Patterns/Interfaces/IResquestAuthUser';
import ResponseSuccess from 'src/Responses/ResponseSuccess';
import UserCreationService from 'src/Services/Users/UserCreationService';
import UserExclusionService from 'src/Services/Users/UserExclusionService';
import UserUpdateService from 'src/Services/Users/UserUpdateService';
import { DataSource } from 'typeorm';


interface IBodyRegistrationUser{
    name: string,
    email: string,
    password: string
}



@Controller('user')
export default class UserController{
    constructor(
        private dataSource: DataSource
    ){

    }

    @Post()
    async create(
        @Body() bodyRequest: IBodyRegistrationUser,
        @Res() response: Response
    ): Promise<void>{
        const userCreationService: UserCreationService = new UserCreationService(this.dataSource);

        await userCreationService.execute({ ...bodyRequest });

        let responseJson: ResponseSuccess = new ResponseSuccess();

        response
            .status(responseJson.statusCode)
            .json(responseJson);
    }

    @Put()
    async update(
        @Body() bodyRequest: IBodyRegistrationUser,
        @Req() request: IRequestAuthUser,
        @Res() response: Response
    ): Promise<void>{
        let { authUser }: IRequestAuthUser = request;

        const userUpdateService: UserUpdateService = new UserUpdateService(this.dataSource);

        await userUpdateService.execute({ ...bodyRequest, userUuid: authUser.id_uuid });

        let responseJson: ResponseSuccess = new ResponseSuccess();

        response
            .status(responseJson.statusCode)
            .json(responseJson);
    }

    @Delete()
    async delete(
        @Req() request: IRequestAuthUser,
        @Res() response: Response
    ): Promise<void>{

        let { authUser }: IRequestAuthUser = request;

        const userExclusionService: UserExclusionService = new UserExclusionService(this.dataSource);

        await userExclusionService.execute({ userUuid: authUser.id_uuid });

        let responseJson: ResponseSuccess = new ResponseSuccess();

        response
            .status(responseJson.statusCode)
            .json(responseJson);
    }

    @Get()
    load(
        @Req() request: IRequestAuthUser,
        @Res() response: Response
    ): void{
        let { authUser }: IRequestAuthUser = request;

        let responseJson: ResponseSuccess = new ResponseSuccess({
            data: {
                uuid: authUser.id_uuid,
                email: authUser.email,
                name: authUser.name
            }
        });

        response
            .status(responseJson.statusCode)
            .json(responseJson);
    }
}