import { User } from "./user.model"

const getAllUserFromDB = async () =>{
    const users = await User.find()
    return users
}

const getSingleUserFromDB = async (email: string) =>{
    const user = await User.findOne({email})
    return user
}

const updateUserInfoIntoDB = async (email: string, data: any) =>{
    const user = await User.findOneAndUpdate({email}, data, {new: true})
    return user
}
const deleteUserFromDB = async (email: string) =>{
    const user = await User.findOneAndUpdate({email}, {isDeleted: true}, {new: true})
    return user
}

export const userService = {
    getAllUserFromDB,
    getSingleUserFromDB,
    updateUserInfoIntoDB,
    deleteUserFromDB
}
