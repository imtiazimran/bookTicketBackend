
import isAuth, { Request } from "../../middleware/isAuth";
import catchAsync from "../../utils/catchAsync";
import { CoachService } from "./coach.service";


const createNewCoach = catchAsync(async (req, res) => {
    const coach = await CoachService.createNewCoachDB(req.body)
    res.status(201).json({
        success: true,
        message: "Coach created successfully",
        coach
    })
})

const getCoaches = catchAsync(async (req, res) => {
    const coaches = await CoachService.getCoachesDB();
    const sortedCoaches = coaches.sort((a, b) => b.updatedAt - a.updatedAt);
    res.status(200).json({
        success: true,
        message: "Coaches fetched successfully",
        coach: sortedCoaches
    });
});

const getCoach = catchAsync(async (req, res) => {
    const user = await isAuth({token: req.query.token as string}, req, res)
    // console.log({user});
    // console.log("inside request", req.user);
    const coach = await CoachService.getCoachDB(req.params.id)
    res.status(200).json({
        success: true,
        message: "Coach fetched successfully",
        coach
    })
})

const updateCoach = catchAsync(async (req, res) => {
    const coach = await CoachService.updateCoachDB(req.params.id, req.body)
    res.status(200).json({
        success: true,
        message: "Coach updated successfully",
        coach
    })
})

const bookSeat = catchAsync(async (req: Request, res) => {
    const user = await isAuth({token: req.query.token as string}, req, res)
    try {
        const { id } = req.params;
        const { bookedSeats } = req.body;
        // console.log("inside book seat",req.query.token, user);
        if (!req.user || typeof req.user !== 'object') {
            return res.status(401).json({ success: false, message: 'Unauthorized: User not found' });
        }

        // if (!wss) {
        //     throw new Error('WebSocket server is not initialized');
        // }

        // Call bookSeatDB with wss instance
        const coach = await CoachService.bookSeatDB(id,req.user._id as string, bookedSeats);

        res.status(200).json({
            success: true,
            message: "Seat booked successfully",
            coach
        });
    } catch (error: any) {
        console.error('Error booking seat:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

const unBookSeat = catchAsync(async (req, res) => {
    // console.log("inside unbook seat",req.body);
    try {
        const { id } = req.params;
        const { seatNumbers } = req.body;

        const coach = await CoachService.unbookSeatDB(id, seatNumbers);

        res.status(200).json({
            success: true,
            message: "Seat booked successfully",
            coach
        });
    } catch (error: any) {
        console.error('Error booking seat:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

const deleteCoach = catchAsync(async (req, res) => {
    const coach = await CoachService.deleteCoachDB(req.params.id)
    res.status(200).json({
        success: true,
        message: "Coach deleted successfully",
        coach
    })
})

export const CoachController = { createNewCoach, getCoaches, getCoach, updateCoach, deleteCoach, bookSeat, unBookSeat }
