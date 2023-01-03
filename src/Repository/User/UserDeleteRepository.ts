import User from "src/Models/User";
import DeleteRepository from "src/Patterns/Repository/DeleteRepository";



interface IUserExclusion{
    user: User
}


export default class UserDeleteRepository extends DeleteRepository<IUserExclusion>{
    async delete({
        user
    }: IUserExclusion): Promise<void> {
        
        await this.transaction.remove(user);
    }

}