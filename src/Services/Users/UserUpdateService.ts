import User from "src/Models/User";
import BaseService from "src/Patterns/Service/BaseService";
import UserFindOneRepository from "src/Repository/User/UserFindOneRepository";
import UserUpdateRepository from "src/Repository/User/UserUpdateRepository";



interface UserUpdateServiceProps{
    userUuid: string,
    email: string,
    name: string,
    password: string
}


export default class UserUpdateService extends BaseService<UserUpdateServiceProps, void>{
    async execute({
        email,
        name,
        password,
        userUuid
    }: UserUpdateServiceProps): Promise<void> {
        
        this.dataSource.transaction(async (transaction) =>{
            const userFindRepository: UserFindOneRepository = new UserFindOneRepository(transaction);
            const userUpdateRepository: UserUpdateRepository = new UserUpdateRepository(transaction);
            
            let user: User = await userFindRepository.find({
                column: "id_uuid",
                value: userUuid
            });

            await userUpdateRepository.update({
                user,
                email,
                name,
                password
            });
        });
    }

}