import { Request, Response } from 'express';
import User, { userType } from '../modules/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user: any
        }
    }
}

export let login = async (req: Request, res: Response) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_SECRET!,

                {
                    expiresIn: '2h',
                }
            );

            // save user token
            user.token = token;
            console.log(req.user);
            // user
            res.status(200).json(user);
        } else {
            res.status(400).send('Invalid Credentials');
        }
    } catch (err) {
        console.log(err);
    }
};

export let register = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            res.status(400).send('User already exists');
        }

        //Encrypt user password
        let encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
            role,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_SECRET!,
            {
                expiresIn: '2h',
            }
        );
        // save user token
        user.token = token;

        // return new user
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
};

export const current = (req: Request, res: Response) => {
    try {
        res.send(req.user);
    } catch (error){
        console.log(error);
    }
}