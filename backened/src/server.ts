import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import { noteRouter } from './modules/note/note.routes'
import { userRouter } from './modules/user/user.routes'
import { authRouter } from './modules/auth/auth.routes'
import { checkAuth, requireAuth } from './middleware/auth'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middleware/error-handler'
import cors from 'cors'

const app = express()

const db_url = process.env.mongo_url as string
const port = 3000

mongoose.connect(db_url)
.then(()=> app.listen(port))
.catch(err => console.error(`failed to connect to mongoDB, ${err}`))

app.use(express.json())
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
)
app.use(cookieParser())

app.use(checkAuth) //every page will know which user has currently login

app.use('/auth', authRouter)
app.use('/users', requireAuth, userRouter)
app.use('/notes', requireAuth, noteRouter)

//another routes
app.use((req: Request, res: Response)=> {
    res.status(404).json({message: 'page not found'})
})

app.use(errorHandler)