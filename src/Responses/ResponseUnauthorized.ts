import IResponseProps from "src/Patterns/Interfaces/IResponseProps";
import BaseResponse from "./BaseResponse";




export default class ResponseUnauthorized extends BaseResponse{
    constructor({
        message = "UNAUTHORIZED",
        statusCode = 401,
        data
    }: Partial<IResponseProps> = {}){
        super({ message, statusCode, data });
    }
}