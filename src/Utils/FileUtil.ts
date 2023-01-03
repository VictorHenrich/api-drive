import { 
    createWriteStream, 
    createReadStream,
    WriteStream,
    ReadStream,
    existsSync,
    mkdirSync
} from "fs";
import { join } from "path";

import mimeTypes from "src/Constants/MimeTypes";
import MimeTypeNotFoundError from "src/Exceptions/MimeTypeNotFoundError";
import IMimeType from "src/Patterns/Interfaces/IMimeType";
import { Readable, Writable } from "stream";
const JWT = require('jsonwebtoken');


type FileBuffer = Buffer | string;

const SECRET_KEY =  "MINHA_CHAVE_SECRETA";

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

    public static readFile(
        path: string,
        filename: string,
        encoding: BufferEncoding = "utf-8"
    ): Readable{
        let path_: string = join(path, filename);

        let readStream: ReadStream = createReadStream(path_, { encoding });

        return readStream;
    }

    public static encodeJWT(payload: any): string{
        return JWT.sign(payload, SECRET_KEY);
    }

    public static decodeJWT(token: string): any{
        return JWT.verify(token, SECRET_KEY);
    }
}