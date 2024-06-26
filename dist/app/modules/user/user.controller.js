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
exports.userController = void 0;
const isAuth_1 = __importDefault(require("../../middleware/isAuth"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const user_service_1 = require("./user.service");
const getAllUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_service_1.userService.getAllUserFromDB();
    res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        users
    });
}));
const getSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.query.token);
    const auth = yield (0, isAuth_1.default)({ token: req.query.token }, req, res);
    // Type guard to check if auth is a TUser object
    function isAuthenticatedUser(auth) {
        return auth && typeof auth === 'object' && 'email' in auth;
    }
    if (!isAuthenticatedUser(auth)) {
        return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
    }
    const email = auth.email;
    const userData = yield user_service_1.userService.getSingleUserFromDB(email);
    res.status(200).json({
        success: true,
        message: "User fetched successfully",
        userData
    });
}));
const updateUserInfo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.userService.updateUserInfoIntoDB(req.params.email, req.body);
    res.status(200).json({
        success: true,
        message: "User updated successfully",
        user
    });
}));
const deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.userService.deleteUserFromDB(req.params.email);
    res.status(200).json({
        success: true,
        message: "User deleted successfully",
        user
    });
}));
exports.userController = {
    getAllUser,
    getSingleUser,
    updateUserInfo,
    deleteUser
};
