"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const quizRoutes_1 = __importDefault(require("./routes/quizRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// Default routes
app.get('/', (req, res, next) => {
    res.send(`App name: ${process.env.APP_NAME}`);
});
// Quiz Routes
app.use('/quiz', quizRoutes_1.default);
// User routes
app.use('/user', userRoutes_1.default);
app.listen(process.env.SERVER_PORT, () => console.log(`Server running on localhost:${process.env.SERVER_PORT}`));
