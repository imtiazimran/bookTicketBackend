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
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'manager'],
        default: 'user'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export const User = model<Tuser>('User', userSchema)