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
exports.googleAuth = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const google_auth_library_1 = require("google-auth-library");
const authClient = new google_auth_library_1.OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: 'http://localhost:3000/auth/google/callback' // Replace with your redirect URI
});
router.get('/login', (req, res) => {
    const authorizationUrl = authClient.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'profile', 'email', 'openid',
            'https://www.googleapis.com/auth/userinfo.profile'
        ]
    });
    res.redirect(authorizationUrl);
});
router.get('/auth/google/callback', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    try {
        const { accessToken, refreshToken } = yield exchangeCodeForTokens(code);
        console.log(accessToken, refreshToken);
        res.status(200).json({
            success: true,
            token: accessToken,
            refreshToken
        });
    }
    catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).send('Authentication failed');
    }
}));
function exchangeCodeForTokens(code) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tokenResponse = yield authClient.getToken(code);
            const { tokens } = tokenResponse;
            const accessToken = tokens.access_token;
            const refreshToken = tokens.refresh_token;
            const userInfo = yield getUserInfo(accessToken);
            return { accessToken, refreshToken, userInfo };
        }
        catch (error) {
            console.error('Error exchanging code for tokens:', error);
            throw error;
        }
    });
}
function getUserInfo(accessToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'https://www.googleapis.com/oauth2/v3/userinfo';
        const response = yield fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const userInfo = yield response.json();
        return userInfo;
    });
}
exports.googleAuth = router;
