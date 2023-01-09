import { fileUploadPath } from 'src/Constants/Paths';
import FileUtil from "src/Utils/FileUtil";
import BaseService from "src/Patterns/Service/BaseService";
import DriveCreateRepostory from "src/Repository/Drives/DriveCreateRepository";
import Drives from "src/Models/Drives";
import User from "src/Models/User";
import { join } from "path";
import Base64Util from 'src/Utils/Base64Util';


type FileContent = Buffer | string;

export interface UploadDriveProps{
    content: FileContent,
    filename: string,
    user: User
}


export default class UploadDriveService extends BaseService<UploadDriveProps, void>{
    async execute({
        content,
        filename,
        user
    }: UploadDriveProps): Promise<void> {
        await this.dataSource.transaction(async transaction => {
            await FileUtil.createPathNotExist(fileUploadPath)

            const driveCreateRepository: DriveCreateRepostory = new DriveCreateRepostory(transaction);

            let fullUserPath: string = join(fileUploadPath, user.id_uuid);

            let [filename_, filetype ]: string[] = filename.split('.');

            let drive: Drives = 
                await driveCreateRepository.create({
                    filetype,
                    user,
                    path: fullUserPath,
                    filename: filename_
                });

            let fullFileName: string = `${drive.id_uuid}.${drive.filetype}`;

            let fileContent: Buffer = Base64Util.decodeBase64(content);

            FileUtil.writeFile(fileContent, fullUserPath, fullFileName);
        });
    }

}