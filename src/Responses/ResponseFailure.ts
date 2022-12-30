import IResponseProps from "src/Patterns/Interfaces/IResponseProps";
import BaseResponse from "./BaseResponse";

export default class ResponseFailure extends BaseResponse{

    constructor({
        message = "ERROR",
        statusCode = 500,
        data
    }: Partial<IResponseProps> = {}){
        super({ message, statusCode, data });
    }
}