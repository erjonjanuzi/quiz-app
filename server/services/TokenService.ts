import jwt from 'jsonwebtoken';
import { UserPayload } from '../common/interfaces/UserPayload';

export class TokenService {
    private readonly EXPIRES_IN = '4h';
    private readonly JWT_KEY;

    constructor(){
        if (!process.env.JWT_KEY){
            throw new Error('JWT_KEY must be defined');
        }
        this.JWT_KEY = process.env.JWT_KEY;
    }

    createToken = (payload: UserPayload) => {
        return jwt.sign(
            payload,
            this.JWT_KEY,
            {
                expiresIn: this.EXPIRES_IN,
            }
        );
    }

    verifyToken = (token: string) => {
        return jwt.verify(token, this.JWT_KEY) as UserPayload;
    }
}