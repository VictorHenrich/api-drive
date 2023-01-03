import { 
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Req
} from '@nestjs/common';
import IRequestAuthUser from 'src/Patterns/Interfaces/IResquestAuthUser';
import BaseResponse from 'src/Responses/BaseResponse';
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
        @Body() bodyRequest: IBodyRegistrationUser
    ): Promise<BaseResponse>{
        const userCreationService: UserCreationService = new UserCreationService(this.dataSource);

        await userCreationService.execute({ ...bodyRequest });

        return new ResponseSuccess();
    }

    @Put()
    async update(
        @Body() bodyRequest: IBodyRegistrationUser,
        @Req() request: IRequestAuthUser
    ): Promise<BaseResponse>{
        let { authUser }: IRequestAuthUser = request;

        const userUpdateService: UserUpdateService = new UserUpdateService(this.dataSource);

        await userUpdateService.execute({ ...bodyRequest, userUuid: authUser.id_uuid });

        return new ResponseSuccess();
    }

    @Delete()
    async delete(
        @Req() request: IRequestAuthUser
    ): Promise<BaseResponse>{

        let { authUser }: IRequestAuthUser = request;

        const userExclusionService: UserExclusionService = new UserExclusionService(this.dataSource);

        await userExclusionService.execute({ userUuid: authUser.id_uuid });

        return new ResponseSuccess();
    }

    @Get()
    load(
        @Req() request: IRequestAuthUser
    ): BaseResponse{
        let { authUser }: IRequestAuthUser = request;

        
        return new ResponseSuccess({
            data: {
                uuid: authUser.id_uuid,
                email: authUser.email,
                name: authUser.name
            }
        });

    }
}