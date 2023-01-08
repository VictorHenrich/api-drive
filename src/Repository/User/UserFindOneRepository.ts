import UserNotFoundError from "src/Exceptions/UserNotFoundError";
import User from "src/Models/User";
import FindRepository, { IFindOneRepositoryDefault } from "src/Patterns/Repository/FindRepository";


type UserFindOneRepositoryProps = IFindOneRepositoryDefault<"id" | "id_uuid">;

export default class UserFindOneRepository extends FindRepository<User, UserFindOneRepositoryProps>{
    async find({
        column,
        value
    }: UserFindOneRepositoryProps): Promise<User> {
        return await User
                    .findOneByOrFail({ [column]: value })
                    .catch(() => {
                        throw new UserNotFoundError();
                    });
    }

}