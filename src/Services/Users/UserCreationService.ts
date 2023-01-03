import BaseService from "src/Patterns/Service/BaseService";
import UserCreateRepository from "src/Repository/User/UserCreateRepository";



export interface UserCreationServiceProps{
    email: string,
    name: string,
    password: string
}


export default class UserCreationService extends BaseService<UserCreationServiceProps, void>{
    async execute({
        email,
        name,
        password
    }: UserCreationServiceProps): Promise<void> {
        await this.dataSource.transaction(async (transaction) => {

            const userCreateRepository = new UserCreateRepository(transaction);

            await userCreateRepository.create({
                email,
                name,
                password
            });
        });

        
    }

}