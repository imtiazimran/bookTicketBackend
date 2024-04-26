import mongoose, { Schema, model } from "mongoose";
import { TBooking, TCoach } from "./coach.interface";

const bookingSchema: Schema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'User' }, // Reference to the User model
  coachId: { type: mongoose.Types.ObjectId, ref: 'Coach' }, // Reference to the Coach model
  seatNumber: { type: [String], required: true },
});

const coachSchema = new Schema<TCoach>({
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

},
    {
        timestamps: true
    }
)

export const Coach = model<TCoach>('Coach', coachSchema)