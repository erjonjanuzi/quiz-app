import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri: string = process.env.DB_URI!;

mongoose.connect(uri, (err: any) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log('Connected to database');
    }
});

export const UserSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, required: true },
        token: { type: String, required: false },
    },
    { versionKey: false }
);

export interface userType {
    firstName: String;
    lastName: String;
    email: String;
    password: String;
    role: String;
}

const User = mongoose.model('User', UserSchema, 'users');
export default User;
