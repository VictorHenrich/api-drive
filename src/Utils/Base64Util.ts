
type FileBuffer = Buffer | string;


export default class Base64Util{
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
}