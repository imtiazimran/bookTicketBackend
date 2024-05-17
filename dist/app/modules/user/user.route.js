"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.get('/', user_controller_1.userController.getAllUser);
router.get('/me', user_controller_1.userController.getSingleUser);
router.patch('/:email', user_controller_1.userController.updateUserInfo);
router.delete('/:email', user_controller_1.userController.deleteUser);
exports.userRoute = router;
