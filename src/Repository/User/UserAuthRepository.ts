import User from "src/Models/User";
import AuthRepository from "src/Patterns/Repository/AuthRepository";
import UserNotFoundError from "src/Exceptions/UserNotFoundError";


interface IUserAuthentication{
    email: string,
    password: string
}


export default class UserAuthRepository extends AuthRepository<IUserAuthentication, User>{
    async auth({
        email,
        password
    }: IUserAuthentication): Promise<User>{
        let user: User = 
            await User
                    .createQueryBuilder()
                    .where(
                        `email = :email AND password = :password`,
                        {
                            email,
                            password
                        } 
                    )
                    .getOneOrFail()
                    .catch(() => {
                        throw new UserNotFoundError();
                    });

        return user;
    }

}