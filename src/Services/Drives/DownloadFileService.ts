import { fileUploadPath } from "src/Constants/Paths";
import BaseService from "src/Patterns/Service/BaseService";
import FileUtil from "src/Utils/FileUtil";
import { Readable } from "stream";


interface DownloadFileProps{
    filename: string
}


export default class DownloadFileService extends BaseService<DownloadFileProps, Readable>{
    execute({
        filename
    }: DownloadFileProps): Readable {
        let stream: Readable = 
            FileUtil.readFile(
                fileUploadPath,
                filename
            );

        return stream;
    }
}   