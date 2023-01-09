import Drives from "src/Models/Drives";
import User from "src/Models/User";
import BaseService from "src/Patterns/Service/BaseService";
import DriveFindOneRepository from "src/Repository/Drives/DriveFindOneRepository";
import DriveUpdateRepository from "src/Repository/Drives/DriveUpdateRepository";



interface DriveUpdateServiceProps{
    filename: string,
    user: User,
    driveUUID: string
}


export default class DriveUpdateService extends BaseService<DriveUpdateServiceProps, void>{
    public execute({ filename, user, driveUUID }: DriveUpdateServiceProps): void | Promise<void> {
        return new Promise(async(resolve, reject) => {
            await this.dataSource.transaction(async transaction =>{
                try{

                    const driveFindOneRepository = new DriveFindOneRepository(transaction);
                    const driveUpdateRepository = new DriveUpdateRepository(transaction);

                    let drive: Drives = 
                        await driveFindOneRepository
                                .find({
                                    column: "id_uuid",
                                    value: driveUUID,
                                    user
                                });

                    await driveUpdateRepository.update({ drive, filename });
                    
                    resolve();

                }catch(error){

                    reject(error);
                }
            })
        });
    }

}