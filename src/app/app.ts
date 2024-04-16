import express, { Application, Request, Response } from "express";
import cors from 'cors'
import { CoachRoute } from "./modules/coach/coach.route";
import { authRoute } from "./authorization/googleAuth";
const app: Application = express()

app.use(express.json())
app.use(cors())
app.use('/', authRoute)
app.use('/api/v1/coach', CoachRoute)

app.get('/', (req, res) => {
    res.send('Book Bus ticket is running...')
})


app.all("*", (req: Request, res: Response) =>{
    res.status(404).json({
        success: false,
        message: "No route found"
    })
})

export default app