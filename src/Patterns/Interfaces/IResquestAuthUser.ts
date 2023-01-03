import { Request } from "@nestjs/common"
import User from "src/Models/User"



export default interface IRequestAuthUser extends Request{
    authUser: User
}