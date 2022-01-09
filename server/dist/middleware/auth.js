"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let tokenSecret = process.env.TOKEN_SECRET || 'secret';
const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['authorization'];
    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, tokenSecret);
        req.user = decoded;
    }
    catch (err) {
        return res.status(401).send(err);
    }
    return next();
};
exports.default = verifyToken;
