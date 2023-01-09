const JWT = require('jsonwebtoken');


const SECRET_KEY =  "MINHA_CHAVE_SECRETA";

export default class JWTUtil{
    public static encodeJWT(payload: any): string{
        return JWT.sign(payload, SECRET_KEY);
    }

    public static decodeJWT(token: string): any{
        return JWT.verify(token, SECRET_KEY);
    }
}