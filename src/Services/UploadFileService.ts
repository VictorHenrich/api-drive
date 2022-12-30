import { Readable } from "stream";
import { fileUploadPath } from 'src/Constants/Paths';
import IService from "src/Patterns/Service/IService";
import FileUtil from "src/Utils/FileUtil";


type FileContent = Buffer | string;

export interface UploadFileServiceProps{
    content: FileContent,
    filename: string
}


export default class UploadFileService implements IService<UploadFileServiceProps, void>{
    execute({
        content,
        filename
    }: UploadFileServiceProps): void | Promise<void> {
        let fileContent: Buffer = FileUtil.decodeBase64(content);

        let fileStream: Readable = FileUtil.bufferToReadStream(fileContent);

        FileUtil.writeFile(fileStream, fileUploadPath, filename);
    }

}