import User from "src/Models/User";
import IPayloadJWT from "src/Patterns/Interfaces/IPayloaJWT";
import BaseService from "src/Patterns/Service/BaseService";
import UserAuthRepository from "src/Repository/User/UserAuthRepository";
import FileUtil from "src/Utils/FileUtil";


export interface UserAuthLoginServiceProps{
    email: string,
    password: string
}


export default class UserAuthLoginService extends BaseService<UserAuthLoginServiceProps, string>{
    execute({
        email,
        password
    }: UserAuthLoginServiceProps): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try{
                await this.dataSource.transaction(async(transaction) => {
                    const minutesExpired: number = 5;
    
                    const userAuthRepository: UserAuthRepository = new UserAuthRepository(transaction);
    
                    let user: User = await userAuthRepository.auth({
                        email,
                        password
                    });
    
                    let payload: IPayloadJWT = {
                        userUuid: user.id_uuid,
                        expired: Date.now() + (60000 ^ minutesExpired)
                    };
            
                    let token: string = FileUtil.encodeJWT(payload);
        
                    resolve(`Bearer ${token}`);
                });

            }catch(error){
                reject(error);
            }
        });
    }

}