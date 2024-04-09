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
exports.CoachController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const coach_service_1 = require("./coach.service");
const createNewCoach = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const coach = yield coach_service_1.CoachService.createNewCoachDB(req.body);
    res.status(201).json({
        success: true,
        message: "Coach created successfully",
        coach
    });
}));
const getCoaches = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const coaches = yield coach_service_1.CoachService.getCoachesDB();
    const sortedCoaches = coaches.sort((a, b) => b.updatedAt - a.updatedAt);
    res.status(200).json({
        success: true,
        message: "Coaches fetched successfully",
        coach: sortedCoaches
    });
}));
const getCoach = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const coach = yield coach_service_1.CoachService.getCoachDB(req.params.id);
    res.status(200).json({
        success: true,
        message: "Coach fetched successfully",
        coach
    });
}));
const updateCoach = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const coach = yield coach_service_1.CoachService.updateCoachDB(req.params.id, req.body);
    res.status(200).json({
        success: true,
        message: "Coach updated successfully",
        coach
    });
}));
const bookSeat = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { bookedSeats } = req.body;
        // if (!wss) {
        //     throw new Error('WebSocket server is not initialized');
        // }
        // Call bookSeatDB with wss instance
        const coach = yield coach_service_1.CoachService.bookSeatDB(id, bookedSeats);
        res.status(200).json({
            success: true,
            message: "Seat booked successfully",
            coach
        });
    }
    catch (error) {
        console.error('Error booking seat:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}));
const unBookSeat = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { seatNumbers } = req.body;
        const coach = yield coach_service_1.CoachService.unbookSeatDB(id, seatNumbers);
        res.status(200).json({
            success: true,
            message: "Seat booked successfully",
            coach
        });
    }
    catch (error) {
        console.error('Error booking seat:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}));
const deleteCoach = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const coach = yield coach_service_1.CoachService.deleteCoachDB(req.params.id);
    res.status(200).json({
        success: true,
        message: "Coach deleted successfully",
        coach
    });
}));
exports.CoachController = { createNewCoach, getCoaches, getCoach, updateCoach, deleteCoach, bookSeat, unBookSeat };
