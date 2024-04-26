import { NextFunction, Request as ExpressRequest, Response } from 'express';
import jwt, { Secret, VerifyErrors, JwtPayload } from 'jsonwebtoken';

// Define a custom type for the Request object with the id property included
export interface Request extends ExpressRequest {
    id?: string;
}

const secret = process.env.JWT_SECRET_KEY as Secret;

const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        } else {
            let decodedPayload: JwtPayload | undefined;
            if (typeof decoded === 'string') {
                try {
                    decodedPayload = JSON.parse(decoded);
                } catch (error) {
                    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
                }
            } else {
                decodedPayload = decoded;
            }
            
            if (!decodedPayload || typeof decodedPayload !== 'object' || !('user' in decodedPayload)) {
                return res.status(401).json({ success: false, message: 'Unauthorized: User not found' });
            }
            req.user = decodedPayload.user;
            // Set the 'id' property on the 'req' object
            req.id = decodedPayload.user._id;
            next();
        }
    });
};

export default isAuth;
