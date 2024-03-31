import { Coach } from "./coach.model"

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

const bookSeatDB = async (id: string, seatNumbers: string[]) => {
    try {
        const coach = await Coach.findById(id);

        if (!coach) {
            throw new Error('Coach not found');
        }

        // Ensure coach.bookedSeats is an array
        const bookedSeats: string[] = Array.isArray(coach.bookedSeats) ? coach.bookedSeats : [];

        // Merge new seat numbers with existing booked seats
        const updatedBookedSeats = [...new Set([...bookedSeats, ...seatNumbers])];

        // Update the bookedSeats array with the new seat numbers
        coach.bookedSeats = updatedBookedSeats;

        // Save the updated coach document
        await coach.save();

        return coach;
    } catch (error: any) {
        throw new Error(`Error booking seats: ${error.message}`);
    }
};



const unbookSeatDB = async (id: string, seatNumbers: string[]) => {
    try {
        const coach = await Coach.findById(id);

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
        await coach.save();

        return coach;
    } catch (error: any) {
        throw new Error(`Error unbooking seats: ${error.message}`);
    }
};



const getCoachesDB = async () => {
    const coach = await Coach.find()
    return coach
}

const getCoachDB = async (id: string) => {
    const coach = await Coach.findOne({ _id: id })
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