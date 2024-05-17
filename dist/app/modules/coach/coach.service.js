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
const bookSeatDB = (id, userId, seatNumbers) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coach = yield coach_model_1.Coach.findById(id);
        if (!coach) {
            throw new Error('Coach not found');
        }
        // Create new booking instance
        const newBooking = {
            userId, // Assuming you're creating new booking, you might need to replace this with actual user ID
            coachId: id,
            seatNumber: seatNumbers
        };
        // Push the new booking to the bookedSeats array
        coach.bookedSeats.push(newBooking);
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
        // console.log('Incoming seat numbers:', seatNumbers);
        // Iterate over each seat booking entry in bookedSeats
        coach.bookedSeats.forEach((booking) => {
            // Filter out the seat numbers that need to be unbooked
            booking.seatNumber = booking.seatNumber.filter((seat) => !seatNumbers.includes(seat));
        });
        // Remove any booking entry that now has an empty seatNumber array
        coach.bookedSeats = coach.bookedSeats.filter((booking) => booking.seatNumber.length > 0);
        // Save the updated coach document
        yield coach.save();
        // Example code for WebSocket communication, uncomment if needed
        // wss.clients.forEach((client) => {
        //     if (client.readyState === WebSocket.OPEN) {
        //         console.log('Sending message to client');
        //         client.send('success'); // Customize message as needed
        //     }
        // });
        return coach;
    }
    catch (error) {
        throw new Error(`Error unbooking seats: ${error.message}`);
    }
});
exports.default = unbookSeatDB;
const getCoachesDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const coach = yield coach_model_1.Coach.find();
    return coach;
});
const getCoachDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const coach = yield coach_model_1.Coach.findOne({ _id: id })
        .populate({
        path: "bookedSeats.userId",
        select: "name picture email"
    });
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
