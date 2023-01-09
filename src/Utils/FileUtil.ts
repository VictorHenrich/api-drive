import { 
    createWriteStream, 
    createReadStream,
    WriteStream,
    ReadStream,
    existsSync,
    mkdirSync,
    rm
} from "fs";
import { join } from "path";

import mimeTypes from "src/Constants/MimeTypes";
import MimeTypeNotFoundError from "src/Exceptions/MimeTypeNotFoundError";
import IMimeType from "src/Patterns/Interfaces/IMimeType";
import { Readable } from "stream";



export default class FileUtil{

    public static getType(extension: string): IMimeType{

        let mimeTypeFound: IMimeType = 
            mimeTypes
                .find(item => 
                        item.extension.toUpperCase() == 
                        extension.toUpperCase()
                );

        if(!mimeTypeFound)
            throw new MimeTypeNotFoundError();

        return mimeTypeFound;
    }

    public static writeFile(
        content: Buffer,
        path: string,
        filename: string,
        encoding: BufferEncoding = "utf-8"
    ): void{
        FileUtil.createPathNotExist(path);

        let readableStream: Readable = Readable.from(content);

        let fullPath: string = join(path, filename);

        let writableStream: WriteStream = createWriteStream(fullPath, { encoding });

        readableStream.pipe(writableStream); 
    }

    public static async createPathNotExist(path: string): Promise<void>{
        let pathExists: boolean = await existsSync(path);

        if(!pathExists)
            await mkdirSync(path);
    }

    public static async removeFile(path: string): Promise<void>{
        return new Promise((resolve, reject) => {
            rm(path, (error) => {

                if(error)
                    reject(error);

                else
                    resolve();
            });
        })
    }

    public static readFile(
        path: string,
        filename: string,
        encoding: BufferEncoding = "utf-8"
    ): Readable{
        let path_: string = join(path, filename);

        let readStream: ReadStream = createReadStream(path_, { encoding });

        return readStream;
    }
}