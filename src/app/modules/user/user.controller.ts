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
    const user = await userService.getSingleUserFromDB(req.params.email);
    res.status(200).json({
        success: true,
        message: "User fetched successfully",
        user
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