import { NextFunction, Request as ExpressRequest, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { User } from '../modules/user/user.model';

// Define a custom type for the Request object with the id property included
export interface Request extends ExpressRequest {
    id?: string;
    user?: any; // Modify this to match your user model
}

export type TUser = {
    user(user: any): (import("mongoose").Document<unknown, {}, Tuser> & Tuser & { _id: import("mongoose").Types.ObjectId; }) | PromiseLike<(import("mongoose").Document<unknown, {}, Tuser> & Tuser & { _id: import("mongoose").Types.ObjectId; }) | null> | null;
    role: string,
    isDeleted: boolean,
    _id: string,
    name: string,
    picture: string,
    email: string,
    createdAt: Date,
    updatedAt: Date,
    __v: number
}

const secret = process.env.JWT_SECRET_KEY as Secret;

const isAuth = async ({ token }: { token: string }, req: Request, res: Response) => {
   
    if (!token) {
        return { success: false, message: 'Unauthorized: No token provided' };
    }

    try {
        const decodedPayload = jwt.decode(token) as TUser  | null;

        if (!decodedPayload  || !decodedPayload.email) {
            return { success: false, message: 'Unauthorized: Invalid token' };
        }
        // console.log(decodedPayload)

        let user = await User.findOne({ email: decodedPayload.email });

        if (!user) {
            user = await User.create(decodedPayload.user);
        }

        req.user = user;
        return user;
    } catch (error) {
        return { success: false, message: 'Internal Server Error from auth', error };
    }
};

export default isAuth;
