import { Schema, model } from "mongoose";

const userSchema = new Schema<Tuser>({
    name: {
        type: String,
        default: 'Anonymous'
    },
    picture: {
        type: String
    },
    email: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
})

export const User = model<Tuser>('User', userSchema)