import User from "src/Models/User";
import BaseService from "src/Patterns/Service/BaseService";
import UserFindOneRepository from "src/Repository/User/UserFindOneRepository";


interface UserLoadingServiceProps{
    userUuid: string
}



export default class UserLoadingService extends BaseService<UserLoadingServiceProps, User>{
    execute({ userUuid }: UserLoadingServiceProps): Promise<User> {
        return new Promise(async(resolve, reject) => {

            await this.dataSource.transaction(async transaction => {

                try{
                    const userFindOneRepository: UserFindOneRepository = new UserFindOneRepository(transaction);

                    let user: User = await userFindOneRepository.find({
                        column: "id_uuid",
                        value: userUuid
                    });

                    resolve(user);

                }catch(error){
                    reject(error);
                }
            });
        })
    }

}