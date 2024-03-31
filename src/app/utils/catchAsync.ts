import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsynce = (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err: Error) => next(err))
}

export default catchAsynce