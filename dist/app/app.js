"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const coach_route_1 = require("./modules/coach/coach.route");
const googleAuth_1 = require("./authorization/googleAuth");
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const user_route_1 = require("./modules/user/user.route");
const app = (0, express_1.default)();
app.use((0, express_session_1.default)({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));
// Initialize Passport.js 
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'https://bholatoctg.vercel.app', 'http://bholatoctg.netlify.app', 'https://bookticket-szt6.onrender.com'],
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
}));
app.use('/', googleAuth_1.authRoute);
app.use('/api/v1/coach', coach_route_1.CoachRoute);
app.use('/api/v1/user', user_route_1.userRoute);
app.get('/', (req, res) => {
    res.send('Book Bus ticket is running...');
});
app.all("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "No route found"
    });
});
exports.default = app;
