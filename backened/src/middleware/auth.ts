import jwt, { Secret } from 'jsonwebtoken'
import 'dotenv/config'
import { Request, Response, NextFunction } from 'express'
import { userModel } from '../modules/user/user.model'

const secret = process.env.JWT_secret as Secret

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, secret, async(err: jwt.VerifyErrors | null)=> {
            if(err){
                return res.status(401).json({message: 'Unauthorized'})
            }else next()
        })
    }else{
        return res.status(401).json({message: 'No token, authorization denied'})
    }
}

export const requireRole = (roles: String[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = res.locals.user //from checkAuth
        if(!user || !roles.includes(user.role)){
            return res.status(403).json({message: "Forbidden"})
        }
        next()
    }
}

export const checkAuth = async(req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, secret, async(err: jwt.VerifyErrors | null, decodedToken)=>{
            if(err){
                res.locals.user = null
                next()
            }else{
                res.locals.user = await userModel.findById(decodedToken.id)
                next()
            }
        })
    }else{
        res.locals.user = null
        next()
    }
}