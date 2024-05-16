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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../modules/user/user.model");
const secret = process.env.JWT_SECRET_KEY;
const isAuth = (_a, req_1, res_1) => __awaiter(void 0, [_a, req_1, res_1], void 0, function* ({ token }, req, res) {
    if (!token) {
        return { success: false, message: 'Unauthorized: No token provided' };
    }
    try {
        const decodedPayload = jsonwebtoken_1.default.decode(token);
        if (!decodedPayload || !decodedPayload.email) {
            return { success: false, message: 'Unauthorized: Invalid token' };
        }
        // console.log(decodedPayload)
        let user = yield user_model_1.User.findOne({ email: decodedPayload.email });
        if (!user) {
            user = yield user_model_1.User.create(decodedPayload.user);
        }
        req.user = user;
        return user;
    }
    catch (error) {
        return { success: false, message: 'Internal Server Error from auth', error };
    }
});
exports.default = isAuth;
