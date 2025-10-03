import { authService } from "./auth.service"
import { Request, Response } from "express"

const setTokenCookie = (res: Response, token: string) => {
    res.cookie('jwt', token,{
        httpOnly: true,
        maxAge: 3*24*60*60*1000
    })
}

class AuthController{
    async signup(req: Request, res: Response){
        const data = req.body
        const result = await authService.signup(data)
        if(result === 'user exists'){
            return res.status(401).json({message: 'user already exists'})
        }
        setTokenCookie(res, result.token)
        res.status(201).json({user: result.user})
    }

    async signin(req: Request, res: Response){
        const data = req.body
        const result = await authService.signin(data)
        if(typeof result === "string"){
            return res.status(401).json({message: result})
        }
        setTokenCookie(res, result.token) //now result is token
        res.status(200).json({user: result.user})
    }
}

export const authController = new AuthController()