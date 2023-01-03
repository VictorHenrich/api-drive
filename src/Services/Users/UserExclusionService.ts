import User from "src/Models/User";
import BaseService from "src/Patterns/Service/BaseService";
import UserDeleteRepository from "src/Repository/User/UserDeleteRepository";
import UserFindOneRepository from "src/Repository/User/UserFindOneRepository";



interface UserExclusionServiceProps{
    userUuid: string
}


export default class UserExclusionService extends BaseService<UserExclusionServiceProps, void>{
    async execute({
        userUuid
    }: UserExclusionServiceProps): Promise<void> {
        await this.dataSource.transaction(async (transaction) => {
            const userFindOneRepository: UserFindOneRepository =  new UserFindOneRepository(transaction);
            const userDeleteRepository: UserDeleteRepository = new UserDeleteRepository(transaction);

            let user: User = await userFindOneRepository.find("id_uuid", userUuid);

            await userDeleteRepository.delete({ user });
        });
    }

}