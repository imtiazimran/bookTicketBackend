import express, { Application, Request, Response } from "express";
import cors from 'cors'
import { CoachRoute } from "./modules/coach/coach.route";
import { authRoute } from "./authorization/googleAuth";
import passport from "passport";
import session from "express-session";
import { userRoute } from "./modules/user/user.route";
import bodyParser from "body-parser";
const app: Application = express()

app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },

    }));

// Initialize Passport.js 
app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: [
            'http://localhost:5173',
            'https://bholatoctg.vercel.app',
            'http://bholatoctg.netlify.app',
            'https://bookticket-szt6.onrender.com'
        ],
        methods: "GET,POST,PUT,PATCH,DELETE",
        credentials: true,
    })
);

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', authRoute)
app.use('/api/v1/coach', CoachRoute)
app.use('/api/v1/user', userRoute)

app.get('/', (req, res) => {
    res.send('Book Bus ticket is running...')
})


app.all("*", (req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "No route found"
    })
})

export default app