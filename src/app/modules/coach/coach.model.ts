import { Schema, model } from "mongoose";


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

},
    {
        timestamps: true
    }
)

export const Coach = model<TCoach>('Coach', coachSchema)