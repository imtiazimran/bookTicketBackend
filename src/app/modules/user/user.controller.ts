import isAuth, { TUser } from "../../middleware/isAuth";
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
    // console.log(req.query.token);
    const auth = await isAuth({ token: req.query.token as string }, req, res);

    // Type guard to check if auth is a TUser object
    function isAuthenticatedUser(auth: any): auth is TUser {
        return auth && typeof auth === 'object' && 'email' in auth;
    }

    if (!isAuthenticatedUser(auth)) {
        return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
    }

    const email = auth.email;
    const userData = await userService.getSingleUserFromDB(email);
    res.status(200).json({
        success: true,
        message: "User fetched successfully",
        userData
    });
});

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