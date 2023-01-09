import { join } from "path";
import Drives from "src/Models/Drives";
import User from "src/Models/User";
import BaseService from "src/Patterns/Service/BaseService";
import DriveDeleteRepository from "src/Repository/Drives/DriveDeleteRepository";
import DriveFindOneRepository from "src/Repository/Drives/DriveFindOneRepository";
import FileUtil from "src/Utils/FileUtil";


interface DriveExclusionServiceProps{
    driveUUID: string,
    user: User
}


export default class DriveExclusionService extends BaseService<DriveExclusionServiceProps, void>{
    public execute({ driveUUID, user }: DriveExclusionServiceProps): void | Promise<void> {
        
        return new Promise((resolve, reject) => {
            this.dataSource.transaction(async transaction => {
                try{
                    const driveFindOneRepository = new DriveFindOneRepository(transaction);
                    const driveDeleteRepository = new DriveDeleteRepository(transaction);

                    let drive: Drives = 
                        await driveFindOneRepository
                                .find({ 
                                    column: "id_uuid", 
                                    value: driveUUID,
                                    user 
                                });

                    let fullPath: string = join(drive.path, `${drive.id_uuid}.${drive.filetype}`);

                    await driveDeleteRepository.delete({ drive });
                    
                    await FileUtil.removeFile(fullPath);

                    resolve();

                }catch(error){
                    reject(error);
                }
            });
            
        });
    }

}