import { WebSocket } from "ws"
import { wss } from "../../server"
import { Coach } from "./coach.model"
import {  TCoach } from "./coach.interface"

const createNewCoachDB = async (data: TCoach) => {
    const coach = await Coach.create(data)
    return coach
}
const deleteCoachDB = async (id: string) => {
    const coach = await Coach.findOneAndDelete({ _id: id })
    return coach
}

const updateCoachDB = async (id: string, data: TCoach) => {
    const coach = await Coach.findOneAndUpdate({ _id: id }, data, { new: true })
    return coach
}


const bookSeatDB = async (id: string, userId: string, seatNumbers: string[]) => {
    try {
        const coach = await Coach.findById(id);

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
        await coach.save();

        // Send message to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                console.log('Sending message to client');
                client.send('success'); // Customize message as needed
            }
        });

        return coach;
    } catch (error: any) {
        throw new Error(`Error booking seats: ${error.message}`);
    }
};
// const bookSeatDB = async (coachId: string, userId: string, seatNumber: string[]) => {
//     const data = {
//         userId,
//         coachId,
//         seatNumber,
//     }

//     console.log(data);
//     try {

//         const res = await BookingModel.create(data);

//         // Send message to all connected clients
//         wss.clients.forEach((client) => {
//             if (client.readyState === WebSocket.OPEN) {
//                 console.log('Sending message to client');
//                 client.send('success'); // Customize message as needed
//             }
//         });

//         return res;
//     } catch (error: any) {
//         throw new Error(`Error booking seats: ${error.message}`);
//     }
// };


const unbookSeatDB = async (id: string, seatNumbers: string[]) => {
    try {
        const coach = await Coach.findById(id);

        if (!coach) {
            throw new Error('Coach not found');
        }

        console.log('Incoming seat numbers:', seatNumbers);

        // Iterate over each seat booking entry in bookedSeats
        coach.bookedSeats.forEach((booking: { seatNumber: any[] }) => {
            // Filter out the seat numbers that need to be unbooked
            booking.seatNumber = booking.seatNumber.filter((seat: string) => !seatNumbers.includes(seat));
        });

        // Remove any booking entry that now has an empty seatNumber array
        coach.bookedSeats = coach.bookedSeats.filter((booking: { seatNumber: string | any[] }) => booking.seatNumber.length > 0);

        // Save the updated coach document
        await coach.save();

        // Example code for WebSocket communication, uncomment if needed
        // wss.clients.forEach((client) => {
        //     if (client.readyState === WebSocket.OPEN) {
        //         console.log('Sending message to client');
        //         client.send('success'); // Customize message as needed
        //     }
        // });

        return coach;
    } catch (error: any) {
        throw new Error(`Error unbooking seats: ${error.message}`);
    }
};

export default unbookSeatDB;



const getCoachesDB = async () => {
    const coach = await Coach.find()
    return coach
}

const getCoachDB = async (id: string) => {
   
    const coach = await Coach.findOne({ _id: id })
    .populate({
        path: "bookedSeats.userId",
        select: "name picture email"
    })
    return coach
}

export const CoachService = {
    createNewCoachDB,
    deleteCoachDB,
    updateCoachDB,
    getCoachesDB,
    getCoachDB,
    bookSeatDB,
    unbookSeatDB
}