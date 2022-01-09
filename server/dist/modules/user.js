"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uri = process.env.DB_URI;
mongoose_1.default.connect(uri, (err) => {
    if (err) {
        console.log(err.message);
    }
    else {
        console.log('Connected to database');
    }
});
exports.UserSchema = new mongoose_1.default.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    token: { type: String, required: false },
}, { versionKey: false });
const User = mongoose_1.default.model('User', exports.UserSchema, 'users');
exports.default = User;
