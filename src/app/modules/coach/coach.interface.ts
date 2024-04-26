import mongoose from "mongoose";

export interface TBooking {
    [x: string]: any;
    push: any;
    userId: string
    coachId: string
    seatNumber: string[];
}
export type TCoach = {
    name: string
    image: string
    number: string
    bookedSeats: TBooking
    departure: Date
    price: number
    seats: number,
    updatedAt: any
}