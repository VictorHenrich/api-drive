import { Readable } from "stream";
import { fileUploadPath } from 'src/Constants/Paths';
import FileUtil from "src/Utils/FileUtil";
import BaseService from "src/Patterns/Service/BaseService";
import DriveCreateRepostory from "src/Repository/Drives/DriveCreateRepository";
import Drives from "src/Models/Drives";
import User from "src/Models/User";


type FileContent = Buffer | string;

export interface UploadFileServiceProps{
    content: FileContent,
    filename: string,
    user: User
}


export default class UploadFileService extends BaseService<UploadFileServiceProps, void>{
    execute({
        content,
        filename,
        user
    }: UploadFileServiceProps): void | Promise<void> {
        return new Promise(async (resolve, reject) => {

            await this.dataSource.transaction(async transaction => {
                try{
                    const driveCreateRepository: DriveCreateRepostory = new DriveCreateRepostory(transaction);

                    let drive: Drives = 
                        await driveCreateRepository.create({
                            filename,
                            path: fileUploadPath,
                            user
                        });

                    let fileContent: Buffer = FileUtil.decodeBase64(content);

                    let fileStream: Readable = FileUtil.bufferToReadStream(fileContent);

                    FileUtil.writeFile(fileStream, fileUploadPath, filename);

                }catch(error){
                    reject(error);
                }
            })
        })
    }

}