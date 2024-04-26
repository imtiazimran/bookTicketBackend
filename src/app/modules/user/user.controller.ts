import catchAsynce from "../../utils/catchAsync";
import { userService } from "./user.service";

const getAllUser = catchAsynce(async (req, res) => {
    const users = await userService.getAllUserFromDB();
    res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        users
    })
})

const getSingleUser = catchAsynce(async (req, res) => {
    if (!req.user || typeof req.user !== 'object') {
        return res.status(401).json({ success: false, message: 'Unauthorized: User not found' });
    }

    // Assert the type of req.user to match the expected structure
    const user = req.user as { user: { email: string } }; // Update the type definition as needed

    const email = user.user.email;
    if(!email) {
        throw new Error("User not found");
    }
    const userData = await userService.getSingleUserFromDB(email);
    res.status(200).json({
        success: true,
        message: "User fetched successfully",
        userData
    })
})

const updateUserInfo = catchAsynce(async (req, res) => {
    const user = await userService.updateUserInfoIntoDB(req.params.email, req.body);
    res.status(200).json({
        success: true,
        message: "User updated successfully",
        user
    })
})

const deleteUser = catchAsynce(async (req, res) => {
    const user = await userService.deleteUserFromDB(req.params.email);
    res.status(200).json({
        success: true,
        message: "User deleted successfully",
        user
    })
})

export const userController = {
    getAllUser,
    getSingleUser,
    updateUserInfo,
    deleteUser
}