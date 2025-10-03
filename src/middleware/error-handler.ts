import { Request, Response, NextFunction } from "express"
import { ZodError } from "zod"

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof ZodError){
        return res.status(400).json(err.issues)
    }
    return res.status(500).json({message: 'internal server error'})
}