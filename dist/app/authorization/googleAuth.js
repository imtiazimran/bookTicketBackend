"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const user_model_1 = require("../modules/user/user.model");
const router = express_1.default.Router();
// Define Google OAuth 2.0 Strategy
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID, // Your client id string
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Your client secret string
    callbackURL: 'https://bookticketbackend.onrender.com/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = profile._json;
    try {
        let foundUser = yield user_model_1.User.findOne({ email: user.email });
        if (foundUser) {
            return done(null, foundUser);
        }
        else {
            const newUser = new user_model_1.User({
                name: user.name,
                email: user.email,
                picture: user.picture
            });
            let savedUser = yield newUser.save();
            return done(null, savedUser, { message: 'New user created' });
        }
    }
    catch (error) {
        return done(error);
    }
})));
// Serialize and Deserialize user
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
// Auth Routes
router.get('/auth/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/fail' }), (req, res) => {
    // Successful authentication, redirect home.
    const code = req.query.code;
    res.redirect('/success');
});
router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/bye');
    });
});
// Protect routes
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.status(401).json({ success: false, message: "Unauthorized" });
    }
};
router.get('/success', (req, res) => {
    if (req.isAuthenticated()) {
        console.log(req.user);
        res.status(200).json({
            success: true,
            message: `Login Successful`,
        });
    }
    else {
        res.status(401).json({ success: false, message: "Login Failed" });
    }
});
router.get('/fail', (req, res) => {
    res.status(401).json({ success: false, message: "Login Failed" });
});
router.get('/bye', (req, res) => {
    res.status(200).json({ success: true, message: "Logout Successful" });
});
router.get('/profile', isAuthenticated, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Profile Page",
        data: req.user
    });
});
exports.authRoute = router;
