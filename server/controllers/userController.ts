import { Request, Response } from 'express';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../common/errors/bad-request-error';
import { PasswordService } from '../services/PasswordService';

export const register = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new BadRequestError('Email in use');
    }

    const hashed = await PasswordService.toHash(password);
    const user = User.build({ firstName, lastName, email, password: hashed, role });
    await user.save();

    const token = jwt.sign(
        { id: user.id, email, role },
        process.env.JWT_KEY!,
        {
            expiresIn: '4h',
        }
    );

    res.status(201).send({ id: user.id, firstName, lastName, email, role, token });
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = await PasswordService.compare(user.password, password);

    if (!passwordsMatch) {
        throw new BadRequestError('Invalid credentials');
    }
    
    const token = jwt.sign(
        { id: user.id, email, role: user.role },
        process.env.JWT_KEY!,
        {
            expiresIn: '4h',
        }
    );

    res.status(200).send({ id: user.id, firstName: user.firstName, lastName: user.lastName, email, role: user.role, token });
}

export const current = async (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
}

// export let login = async (req: Request, res: Response) => {
//     try {
//         // Get user input
//         const { email, password } = req.body;

//         // Validate if user exist in our database
//         const user = await User.findOne({ email });

//         if (user && (await bcrypt.compare(password, user.password))) {
//             // Create token
//             const token = jwt.sign(
//                 { user_id: user._id, email },
//                 process.env.TOKEN_SECRET!,

//                 {
//                     expiresIn: '2h',
//                 }
//             );

//             // // save user token
//             // user.token = token;
//             // console.log(req.user);
//             // user
//             res.status(200).json(user);
//         } else {
//             res.status(400).send('Invalid Credentials');
//         }
//     } catch (err) {
//         console.log(err);
//     }
// };

// export const register = async (req: Request, res: Response) => {
//     try {
//         const { firstName, lastName, email, password, role } = req.body;

//         // check if user already exist
//         // Validate if user exist in our database
//         const oldUser = await User.findOne({ email });

//         if (oldUser) {
//             res.status(400).send('User already exists');
//         }

//         //Encrypt user password
//         let encryptedPassword = await bcrypt.hash(password, 10);

//         // Create user in our database
//         const user = await User.create({
//             firstName,
//             lastName,
//             email: email.toLowerCase(), // sanitize: convert email to lowercase
//             password: encryptedPassword,
//             role,
//         });

//         // Create token
        // const token = jwt.sign(
        //     { user_id: user._id, email },
        //     process.env.TOKEN_SECRET!,
        //     {
        //         expiresIn: '2h',
        //     }
        // );
//         // save user token
//         user.token = token;

//         // return new user
//         res.status(201).json(user);
//     } catch (err) {
//         console.log(err);
//     }
// };

// export const current = (req: Request, res: Response) => {
//     try {
//         res.send(req.user);
//     } catch (error){
//         console.log(error);
//     }
// }