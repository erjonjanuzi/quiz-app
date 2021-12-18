import { Request, Response } from 'express';
import User, { userType } from '../modules/user';

// Get all users
export let allUsers = (req: Request, res: Response) => {
    let users = User.find((err: any, users: any) => {
        if (err) {
            res.send(err);
        }
        res.json(users);
    });
};

// Get one user by username
export let getUser = (req: Request, res: Response) => {
    User.findById(req.params.username, (err: any, user: userType) => {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
};

// Add a new user
export let addUser = (req: Request, res: Response) => {
    let newUser = new User(req.body);

    newUser.save((err: any, user: userType) => {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
};

// Delete a user
export let deleteUser = (req: Request, res: Response) => {
    User.deleteOne({ username: req.params.username }, (err: any) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted user!' });
    });
};

// Update a User
export let updateUser = (req: Request, res: Response) => {
    User.findOneAndUpdate(
        { _id: req.params.username },
        req.body,
        { new: true },
        (err: any, user: userType) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        }
    );
};
