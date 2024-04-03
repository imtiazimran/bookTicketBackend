import catchAsynce from "../../utils/catchAsync";
import { CoachService } from "./coach.service";

const createNewCoach = catchAsynce(async (req, res) => {
    const coach = await CoachService.createNewCoachDB(req.body)
    res.status(201).json({
        success: true,
        message: "Coach created successfully",
        coach
    })
})
const getCoaches = catchAsynce(async (req, res) => {
    const coaches = await CoachService.getCoachesDB();
    const sortedCoaches = coaches.sort((a, b) => b.updatedAt - a.updatedAt);
    console.log(sortedCoaches)
    res.status(200).json({
        success: true,
        message: "Coaches fetched successfully",
        coaches: sortedCoaches
    });
});

// const getCoaches = catchAsynce(async (req, res) => {
//     const coaches = await CoachService.getCoachesDB().sort({ updatedAt: -1 }).exec();
//     res.status(200).json({
//         success: true,
//         message: "Coaches fetched successfully",
//         coaches
//     });
// });



const getCoach = catchAsynce(async (req, res) => {
    const coach = await CoachService.getCoachDB(req.params.id)
    res.status(200).json({
        success: true,
        message: "Coach fetched successfully",
        coach
    })
})

const updateCoach = catchAsynce(async (req, res) => {
    const coach = await CoachService.updateCoachDB(req.params.id, req.body)
    res.status(200).json({
        success: true,
        message: "Coach updated successfully",
        coach
    })
})

const bookSeat = catchAsynce(async (req, res) => {
    try {
        const { id } = req.params;
        const { seatNumbers } = req.body;

        const coach = await CoachService.bookSeatDB(id, seatNumbers);
        
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

const unBookSeat = catchAsynce(async (req, res) => {
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



const deleteCoach = catchAsynce(async (req, res) => {
    const coach = await CoachService.deleteCoachDB(req.params.id)
    res.status(200).json({
        success: true,
        message: "Coach deleted successfully",
        coach
    })
})

export const CoachController = { createNewCoach, getCoaches, getCoach, updateCoach, deleteCoach, bookSeat, unBookSeat }