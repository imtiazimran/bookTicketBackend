import express, { Application, Request, Response } from "express";
import cors from 'cors'
import { CoachRoute } from "./modules/coach/coach.route";
import { authRoute } from "./authorization/googleAuth";
import passport from "passport";
import session from "express-session";
import { userRoute } from "./modules/user/user.route";
const app: Application = express()

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));

// Initialize Passport.js 
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json())
app.use(cors())
app.use('/', authRoute)
app.use('/api/v1/coach', CoachRoute)
app.use('/api/v1/user', userRoute)

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