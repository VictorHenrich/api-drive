import CreateRepository from "src/Patterns/Repository/CreateRepository";
import User from "src/Models/User";
import { randomUUID } from "crypto";


interface IUserCreation{
    name: string,
    email: string,
    password: string
}


export default class UserCreateRepository extends CreateRepository<IUserCreation>{
    async create({
        email,
        name,
        password
    }: IUserCreation): Promise<void> {
        const user: User = new User();

        user.id_uuid = randomUUID();
        user.email = email;
        user.name = name;
        user.password = password;

        await this.transaction.save(user);
    }
}