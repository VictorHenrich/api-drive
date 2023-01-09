import User from "src/Models/User";
import UpdateRepository from "src/Patterns/Repository/UpdateRepository";


interface IUserUpdate{
    user: User,
    name: string,
    email: string,
    password?: string
}


export default class UserUpdateRepository extends UpdateRepository<IUserUpdate>{
    async update({
        user,
        name,
        email,
        password
    }: IUserUpdate): Promise<void> {
        user.email = email;
        user.name = name;

        if(password)
            user.password = password;

        await this.transaction.save(user);
    }

}