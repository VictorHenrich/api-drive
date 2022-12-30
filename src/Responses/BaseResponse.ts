import IResponseProps from "src/Patterns/Interfaces/IResponseProps";

export default class BaseResponse{
    public statusCode: number;
    public message: string;
    public data: any;

    constructor({
        statusCode,
        message,
        data
    }: IResponseProps){

        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}