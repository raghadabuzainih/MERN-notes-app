import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import { router } from './modules/note/note.routes'
import 'dotenv/config'

const app = express()

const db_url = process.env.mongo_url as string
const port = 3000

mongoose.connect(db_url)
.then(()=> app.listen(port))
.catch(err => console.error(`failed to connect to mongoDB, ${err}`))

app.use(express.json())
app.use(router)
//another routes
app.use((req: Request, res: Response)=> {
    res.status(404).send('page not found')
})