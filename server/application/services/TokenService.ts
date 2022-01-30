import jwt from 'jsonwebtoken';
import { UserPayload } from '../interfaces/UserPayload';

// Singleton pattern
class TokenService {
    private static instance: TokenService;

    private constructor() { }

    public static getInstance(): TokenService {
        if (!TokenService.instance) {
            TokenService.instance = new TokenService();
        }

        return TokenService.instance;
    }

    public create = (payload: UserPayload) => {
        return jwt.sign(
            payload,
            process.env.JWT_KEY!,
            {
                expiresIn: '4h',
            }
        );
    }

    public verify = (token: string) => {
        return jwt.verify(token, process.env.JWT_KEY!) as UserPayload;
    }
}

export const tokenService = TokenService.getInstance();