import UserNotFoundError from "src/Exceptions/UserNotFound";
import User from "src/Models/User";
import FindRepository from "src/Patterns/Repository/FindRepository";



export default class UserFindOneRepository extends FindRepository<User>{
    async find(column: "id" | "id_uuid", value: any): Promise<User> {

        return await User
                    .findOneByOrFail({ [column]: value })
                    .catch(() => {
                        throw new UserNotFoundError();
                    });
    }
}