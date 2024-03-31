"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coach = void 0;
const mongoose_1 = require("mongoose");
const coachSchema = new mongoose_1.Schema({
    name: {
        type: String,
        default: 'Unnamed Coach'
    },
    image: {
        type: String,
    },
    number: {
        type: String,
        required: true
    },
    bookedSeats: {
        type: [String],
        default: []
    },
    departure: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    seats: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});
exports.Coach = (0, mongoose_1.model)('Coach', coachSchema);
