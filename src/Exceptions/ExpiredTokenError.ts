


export default class ExpiredTokenError extends Error{
    constructor(){
        super("Expired user token!")
    }
}