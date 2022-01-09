"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const user_1 = __importDefault(require("../modules/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get user input
        const { email, password } = req.body;
        // Validate if user exist in our database
        const user = yield user_1.default.findOne({ email });
        if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
            // Create token
            const token = jsonwebtoken_1.default.sign({ user_id: user._id, email }, process.env.TOKEN_SECRET, {
                expiresIn: '2h',
            });
            // save user token
            user.token = token;
            // user
            res.status(200).json(user);
        }
        else {
            res.status(400).send('Invalid Credentials');
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.login = login;
let register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password, role } = req.body;
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = yield user_1.default.findOne({ email });
        if (oldUser) {
            return res.status(409).send('User Already Exist. Please Login');
        }
        //Encrypt user password
        let encryptedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Create user in our database
        const user = yield user_1.default.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: encryptedPassword,
            role,
        });
        // Create token
        const token = jsonwebtoken_1.default.sign({ user_id: user._id, email }, process.env.TOKEN_SECRET, {
            expiresIn: '2h',
        });
        // save user token
        user.token = token;
        // return new user
        res.status(201).json(user);
    }
    catch (err) {
        console.log(err);
    }
});
exports.register = register;
