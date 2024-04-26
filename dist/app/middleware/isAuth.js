"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET_KEY;
const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: 'Unauthorized: Invalid token',
                err
            });
        }
        else {
            let decodedPayload;
            if (typeof decoded === 'string') {
                try {
                    decodedPayload = JSON.parse(decoded);
                }
                catch (error) {
                    return res.status(401).json({
                        message: 'Unauthorized: Invalid token',
                        error
                    });
                }
            }
            else {
                decodedPayload = decoded;
            }
            if (!decodedPayload || typeof decodedPayload !== 'object' || !('user' in decodedPayload)) {
                return res.status(401).json({ success: false, message: 'Unauthorized: User not found' });
            }
            req.user = decodedPayload.user;
            // Set the 'id' property on the 'req' object
            req.id = decodedPayload.user._id;
            next();
        }
    });
};
exports.default = isAuth;
