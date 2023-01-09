import ExpiredTokenError from "src/Exceptions/ExpiredTokenError";
import User from "src/Models/User";
import IPayloadJWT from "src/Patterns/Interfaces/IPayloaJWT";
import BaseService from "src/Patterns/Service/BaseService";
import UserFindOneRepository from "src/Repository/User/UserFindOneRepository";
import FileUtil from "src/Utils/FileUtil";
import JWTUtil from "src/Utils/JWTUtil";



interface UserAuthTokenServiceProps{
    token: string
}



export default class UserAuthTokenService extends BaseService<UserAuthTokenServiceProps, User>{
    public execute({ token }: UserAuthTokenServiceProps): User | Promise<User> {
        return new Promise(async (resolve, reject) => {
            await this.dataSource.transaction(async transaction =>{

                try{
                    const userFindOneRepository = new UserFindOneRepository(transaction);

                    const tokenTreated = token.replace('Bearer ', '');
    
                    let {
                        userUuid,
                        expired
                    }: IPayloadJWT = JWTUtil.decodeJWT(tokenTreated);
    
                    if(expired <= Date.now())
                        throw new ExpiredTokenError();

                    let user: User = await userFindOneRepository.find({
                        column: "id_uuid",
                        value: userUuid
                    });
    
                    resolve(user);

                }catch(error){
                    reject(error);
                }
            });
        });
    }

}