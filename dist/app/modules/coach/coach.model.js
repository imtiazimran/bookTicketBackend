"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coach = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bookingSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'User' }, // Reference to the User model
    coachId: { type: mongoose_1.default.Types.ObjectId, ref: 'Coach' }, // Reference to the Coach model
    seatNumber: { type: [String], required: true },
});
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
    bookedSeats: [bookingSchema],
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
