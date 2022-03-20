import jwt from 'jsonwebtoken'
import OAuth2Client from 'google-auth-library'
import dotenv from 'dotenv'
import UserData from '../models/user.js'

dotenv.config();
const client = new OAuth2Client.OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const auth = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send({message: 'No authorization header provided'});
        }
        const token = req.headers.authorization.split(" ")[1];
        const isGoogleAuth = token.length > 500;

        console.log("token isGoogle?:", isGoogleAuth);
        if (!isGoogleAuth) {
            const decodedData = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = {
                isGoogle: false,
                profileObj: {
                    id: decodedData.id
                },
                token: token
            };
            req.id = decodedData?.id;
        } else {
            const ticket = await client.verifyIdToken({idToken: token, audience: process.env.GOOGLE_CLIENT_ID});
            const payload = ticket.payload;
            const user = await UserData.findOne({email: payload.email}).exec();
            req.user = {
                isGoogle: true,
                profileObj: {
                    id: user.id,
                    imageUrl: payload.picture
                },
                token: token
            };
            req.id = user.id;
        }
        console.log(req.id)
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({message: error.message});
    }
}

export default auth