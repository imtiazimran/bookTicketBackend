"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoachRoute = void 0;
const express_1 = __importDefault(require("express"));
const coach_controller_1 = require("./coach.controller");
const isAuth_1 = __importDefault(require("../../middleware/isAuth"));
const router = express_1.default.Router();
router.get('/', coach_controller_1.CoachController.getCoaches);
router.get('/:id', coach_controller_1.CoachController.getCoach);
router.post('/', coach_controller_1.CoachController.createNewCoach);
router.patch('/:id', coach_controller_1.CoachController.updateCoach);
router.patch('/book/:id/', isAuth_1.default, coach_controller_1.CoachController.bookSeat);
router.patch('/unBook/:id/', coach_controller_1.CoachController.unBookSeat);
router.delete('/:id', coach_controller_1.CoachController.deleteCoach);
exports.CoachRoute = router;
