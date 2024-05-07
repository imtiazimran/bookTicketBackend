import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import jwt, { Secret } from 'jsonwebtoken'; // Import jsonwebtoken
import { User } from '../modules/user/user.model';
import cors from 'cors';

const router = express.Router();

var corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

// Define Google OAuth 2.0 Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    const user = profile._json;

    try {
        let foundUser = await User.findOne({ email: user.email });

        if (foundUser) {
            return done(null, foundUser);
        } else {
            const newUser = new User({
                name: user.name,
                email: user.email,
                picture: user.picture
            });

            let savedUser = await newUser.save();
            return done(null, savedUser);
        }
    } catch (error: any) {
        return done(error);
    }
}));

// Serialize and Deserialize user
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user as unknown as object);
});

// Auth Routes
router.get('/auth/google',
    cors(),
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback',
    cors(),
    passport.authenticate('google', { failureRedirect: '/fail' },),
    (req, res) => {
        // Successful authentication, generate JWT token
        const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET_KEY as Secret); // Change 'secret_key' to your preferred secret key
        // res.redirect('http://localhost:5173')
        res.status(200).json({ success: true, token });
    }
);

// Logout Route
router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/bye');
    });
});

// Profile Route (protected)
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).json({
        success: true,
        message: "Profile Page",
        data: req.user
    });
});

// Failure Route
router.get('/fail', (req, res) => {
    res.status(401).json({ success: false, message: "Login Failed" });
});

// Bye Route
router.get('/bye', (req, res) => {
    res.status(200).json({ success: true, message: "Logout Successful" });
});

export const authRoute = router;
