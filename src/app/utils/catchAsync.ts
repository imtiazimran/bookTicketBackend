import { NextFunction, RequestHandler, Response } from "express";
import { Request } from "../middleware/isAuth";

const catchAsynce = (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err: Error) => next(err))
}

export default catchAsynce