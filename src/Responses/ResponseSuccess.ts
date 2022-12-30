import IResponseProps from "src/Patterns/Interfaces/IResponseProps";
import BaseResponse from "./BaseResponse";





export default class ResponseSuccess extends BaseResponse{

    constructor({
        message = "OK",
        statusCode = 200,
        data
    }: Partial<IResponseProps> = {}){
        super({ message, statusCode, data });
    }
}