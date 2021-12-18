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

export const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
});

export interface userType {
    username: String;
    email: String;
    password: String;
    type: String;
}

const User = mongoose.model('User', UserSchema);
export default User;
