import UserNotFoundError from "src/Exceptions/UserNotFoundError";
import User from "src/Models/User";
import FindRepository, { FindRepositoryProps } from "src/Patterns/Repository/FindRepository";



export default class UserFindOneRepository extends FindRepository<User>{
    async find({
        column,
        value
    }: FindRepositoryProps<"id" | "id_uuid">): Promise<User> {
        return await User
                    .findOneByOrFail({ [column]: value })
                    .catch(() => {
                        throw new UserNotFoundError();
                    });
    }

}