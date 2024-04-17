import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../modules/user/user.model';


const router = express.Router();



// Define Google OAuth 2.0 Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID as string, // Your client id string
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, // Your client secret string
    callbackURL: 'http://localhost:3000/auth/google/callback'
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
            return done(null, savedUser, { message: 'New user created' });
        }
    } catch (error : any) {
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
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/fail' }),
    (req, res) => {
        // Successful authentication, redirect home.
        const code = req.query.code
        res.redirect('/success');
    });

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/bye');
    });

});

// Protect routes
const isAuthenticated = (req: any, res: any, next: any) => {
    if (req.isAuthenticated()) {
        next()
    }
    else {
        res.status(401).json({ success: false, message: "Unauthorized" })
    }
}

router.get('/success', (req, res) => {
    if (req.isAuthenticated()) {
        console.log(req.user)
        res.status(200).json({
            success: true,
            message: `Login Successful`,
        })
    }
    else {
        res.status(401).json({ success: false, message: "Login Failed" })
    }
})
router.get('/fail', (req, res) => {
    res.status(401).json({ success: false, message: "Login Failed" })
})

router.get('/bye', (req, res) => {
    res.status(200).json({ success: true, message: "Logout Successful" })
});




router.get('/profile', isAuthenticated, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Profile Page",
        data: req.user
    })
});

export const authRoute = router
