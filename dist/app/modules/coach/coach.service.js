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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoachService = void 0;
const ws_1 = require("ws");
const server_1 = require("../../server");
const coach_model_1 = require("./coach.model");
const createNewCoachDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const coach = yield coach_model_1.Coach.create(data);
    return coach;
});
const deleteCoachDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const coach = yield coach_model_1.Coach.findOneAndDelete({ _id: id });
    return coach;
});
const updateCoachDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const coach = yield coach_model_1.Coach.findOneAndUpdate({ _id: id }, data, { new: true });
    return coach;
});
const bookSeatDB = (id, seatNumbers) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coach = yield coach_model_1.Coach.findById(id);
        if (!coach) {
            throw new Error('Coach not found');
        }
        // Ensure coach.bookedSeats is an array
        const bookedSeats = Array.isArray(coach.bookedSeats) ? coach.bookedSeats : [];
        // Merge new seat numbers with existing booked seats
        const updatedBookedSeats = [...new Set([...bookedSeats, ...seatNumbers])];
        // Update the bookedSeats array with the new seat numbers
        coach.bookedSeats = updatedBookedSeats;
        // Save the updated coach document
        yield coach.save();
        // Send message to all connected clients
        server_1.wss.clients.forEach((client) => {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                console.log('Sending message to client');
                client.send('success'); // Customize message as needed
            }
        });
        return coach;
    }
    catch (error) {
        throw new Error(`Error booking seats: ${error.message}`);
    }
});
const unbookSeatDB = (id, seatNumbers) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coach = yield coach_model_1.Coach.findById(id);
        if (!coach) {
            throw new Error('Coach not found');
        }
        // Remove each unbooked seat from the bookedSeats array
        seatNumbers.forEach(seat => {
            const index = coach.bookedSeats.indexOf(seat);
            if (index !== -1) {
                coach.bookedSeats.splice(index, 1);
            }
        });
        // Save the updated coach document
        yield coach.save();
        server_1.wss.clients.forEach((client) => {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                console.log('Sending message to client');
                client.send('success'); // Customize message as needed
            }
        });
        return coach;
    }
    catch (error) {
        throw new Error(`Error unbooking seats: ${error.message}`);
    }
});
const getCoachesDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const coach = yield coach_model_1.Coach.find();
    return coach;
});
const getCoachDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const coach = yield coach_model_1.Coach.findOne({ _id: id });
    return coach;
});
exports.CoachService = {
    createNewCoachDB,
    deleteCoachDB,
    updateCoachDB,
    getCoachesDB,
    getCoachDB,
    bookSeatDB,
    unbookSeatDB
};
