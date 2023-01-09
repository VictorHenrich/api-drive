import { fileUploadPath } from 'src/Constants/Paths';
import FileUtil from "src/Utils/FileUtil";
import BaseService from "src/Patterns/Service/BaseService";
import DriveCreateRepostory from "src/Repository/Drives/DriveCreateRepository";
import Drives from "src/Models/Drives";
import User from "src/Models/User";
import { join } from "path";


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

            let [, fileType ]: string[] = filename.split('.');

            let drive: Drives = 
                await driveCreateRepository.create({
                    filename,
                    path: fullUserPath,
                    user
                });

            let fullFileName: string = `${drive.id_uuid}.${fileType}`;

            let fileContent: Buffer = FileUtil.decodeBase64(content);

            FileUtil.writeFile(fileContent, fullUserPath, fullFileName);
        });
    }

}