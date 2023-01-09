import ExpiredTokenError from "src/Exceptions/ExpiredTokenError";
import User from "src/Models/User";
import IPayloadJWT from "src/Patterns/Interfaces/IPayloaJWT";
import BaseService from "src/Patterns/Service/BaseService";
import UserFindOneRepository from "src/Repository/User/UserFindOneRepository";
import FileUtil from "src/Utils/FileUtil";
import UserAuthTokenService from "./UserAuthTokenService";



interface UserAuthRefreshTokenServiceProps{
    token: string
}



export default class UserAuthRefreshTokenService extends BaseService<UserAuthRefreshTokenServiceProps, string>{
    public execute(param: UserAuthRefreshTokenServiceProps): Promise<string> {
        return new Promise(async (resolve, reject) => {
            await this.dataSource.transaction(async transaction =>{
                const minutesExpired: number = 5;

                try{
                    const userAuthTokenService = new UserAuthTokenService(this.dataSource);
                    
                    let user: User = await userAuthTokenService.execute(param);

                    let payload: IPayloadJWT = {
                        userUuid: user.id_uuid,
                        expired: Date.now() + (60000 ^ minutesExpired)
                    };
            
                    let token: string = FileUtil.encodeJWT(payload);
        
                    resolve(`Bearer ${token}`);

                }catch(error){
                    reject(error);
                }
            });
        });
    }

}