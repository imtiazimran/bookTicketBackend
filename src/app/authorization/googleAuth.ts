import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';


const router = express.Router();

router.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));

// Initialize Passport.js 
router.use(passport.initialize());
router.use(passport.session());

// Define Google OAuth 2.0 Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID as string, // Your client id string
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, // Your client secret string
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Verify or create user in the database
    // Call done(null, user) when finished
    console.log(accessToken, profile._json)
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
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect home.
        const code = req.query.code
        console.log(code)
        res.redirect('/');
    });

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Protect routes
function isAuthenticated(req: { isAuthenticated: () => any; }, res: { redirect: (arg0: string) => void; }, next: () => any) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

router.get('/', (req, res) => {
    res.send('Home Page');
});

router.get('/profile', isAuthenticated, (req, res) => {
    res.send('Profile Page');
});

export const authRoute = router
