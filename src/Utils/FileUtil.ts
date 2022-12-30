import { 
    createWriteStream, 
    WriteStream,
    ReadStream,
    existsSync,
    mkdirSync
} from "fs";
import { join } from "path";

import mimeTypes from "src/Constants/MimeTypes";
import MimeTypeNotFoundError from "src/Exceptions/MimeTypeNotFoundError";
import IMimeType from "src/Patterns/Interfaces/IMimeType";
import { Readable } from "stream";


type FileBuffer = Buffer | string;


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

    public static encodeBase64(content: FileBuffer): string{
        let buffer: string;

        if(content instanceof Buffer)
            buffer = content.toString();
        else
            buffer = `${content}`;

        return Buffer.from(buffer, 'base64').toString();
    }

    public static decodeBase64(content: FileBuffer): Buffer{
        let buffer: string;

        if(content instanceof Buffer)
            buffer = buffer.toString()
        else
            buffer = `${content}`;

        return Buffer.from(buffer, "base64");
    }

    public static writeFile(
        content: Readable,
        path: string,
        filename: string,
        encoding: BufferEncoding = "utf-8"
    ): void{
        FileUtil.createPathNotExist(path);

        let fullPath: string = join(path, filename);

        let stream: WriteStream = createWriteStream(fullPath, { encoding });

        content.pipe(stream); 
    }

    public static bufferToReadStream(buffer: Buffer): Readable{
        return Readable.from(buffer);
    }

    public static async createPathNotExist(path: string): Promise<void>{
        let pathExists: boolean = await existsSync(path);

        if(!pathExists)
            await mkdirSync(path);
    }
}