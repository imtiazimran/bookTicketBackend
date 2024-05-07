import express from "express";
const router = express.Router();
import { OAuth2Client } from 'google-auth-library';


const authClient = new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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

router.get('/auth/google/callback', async (req, res) => {
    const code = req.query.code as string;

    try {
        const { accessToken, refreshToken } = await exchangeCodeForTokens(code);

        console.log(accessToken, refreshToken);
        res.status(200).json({
            success: true,
            token: accessToken,
            refreshToken
        });
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).send('Authentication failed');
    }
});

async function exchangeCodeForTokens(code: string) {
    try {
        const tokenResponse = await authClient.getToken(code);
        const { tokens } = tokenResponse;

        const accessToken = tokens.access_token;
        const refreshToken = tokens.refresh_token;

        const userInfo = await getUserInfo(accessToken);

        return { accessToken, refreshToken, userInfo };
    } catch (error) {
        console.error('Error exchanging code for tokens:', error);
        throw error;
    }
}

async function getUserInfo(accessToken: string | null | undefined) {
    const url = 'https://www.googleapis.com/oauth2/v3/userinfo';
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const userInfo = await response.json();
    return userInfo;
}

export const googleAuth = router;

