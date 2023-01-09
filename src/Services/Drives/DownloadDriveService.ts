import Drives from "src/Models/Drives";
import User from "src/Models/User";
import BaseService from "src/Patterns/Service/BaseService";
import DriveFindOneRepository from "src/Repository/Drives/DriveFindOneRepository";
import FileUtil from "src/Utils/FileUtil";
import { Readable } from "stream";


interface DownloadFileProps{
    driveUuid: string,
    user: User
}


export default class DownloadDriveService extends BaseService<DownloadFileProps, Readable>{
    async execute({
        driveUuid,
        user
    }: DownloadFileProps): Promise<Readable> {
        return new Promise(async(resolve, reject) =>{

            await this.dataSource.transaction(async transaction =>{

                try{
                    const driveFindOneRepository: DriveFindOneRepository = new DriveFindOneRepository(transaction);

                    let drive: Drives = await driveFindOneRepository.find({
                        column: "id_uuid",
                        value: driveUuid,
                        user,
                    });

                    let stream: Readable = 
                        FileUtil.readFile(
                            drive.path,
                            `${drive.id_uuid}.${drive.filetype}`
                        );

                    resolve(stream);

                }catch(error){
                    reject(error);
                }
            });
        });
    }
}   