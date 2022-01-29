import { Request, Response } from 'express';
import { User } from '../../models/user';
import { BadRequestError } from '../errors/BadRequestError';
import { PasswordService } from '../services/PasswordService';
import { tokenService } from '../services/TokenService';

export class Auth {
    static register = async (req: Request, res: Response) => {
        const { firstName, lastName, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError('Email in use');
        }

        const hashed = await PasswordService.toHash(password);
        const user = User.build({ firstName, lastName, email, password: hashed, role });
        await user.save();

        const token = tokenService.create({
            id: user.id,
            email,
            role: user.role
        });

        res.status(201).send({
            id: user.id,
            firstName,
            lastName,
            email,
            role,
            token
        });
    };

    static login = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            throw new BadRequestError('Invalid credentials');
        }

        const passwordsMatch = await PasswordService.compare(user.password, password);

        if (!passwordsMatch) {
            throw new BadRequestError('Invalid credentials');
        }

        const token = tokenService.create({
            id: user.id,
            email,
            role: user.role
        });

        res.status(200).send({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email,
            role: user.role,
            token
        });
    }

    static current = async (req: Request, res: Response) => {
        res.send({ currentUser: req.currentUser || null });
    }
}