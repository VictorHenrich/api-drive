import Drives from "src/Models/Drives";
import User from "src/Models/User";
import BaseService from "src/Patterns/Service/BaseService";
import DriveFindManyRepository from "src/Repository/Drives/DriveFindManyRepositpory";
import UserFindOneRepository from "src/Repository/User/UserFindOneRepository";


interface DriveListingServiceProps{
    user: User
}



export default class DriveListingService extends BaseService<DriveListingServiceProps, Drives[]>{
    execute({ user }: DriveListingServiceProps): Promise<Drives[]> {
        return new Promise(async(resolve, reject) => {

            await this.dataSource.transaction(async transaction => {

                try{
                    const driveFindManyRepository: DriveFindManyRepository = new DriveFindManyRepository(transaction);

                    let drives: Drives[] = await driveFindManyRepository.find({ user });

                    resolve(drives);

                }catch(error){
                    reject(error);
                }
            });
        })
    }

}