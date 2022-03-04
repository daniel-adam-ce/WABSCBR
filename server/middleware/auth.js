import jwt from 'jsonwebtoken'
import OAuth2Client from 'google-auth-library'
import dotenv from 'dotenv'

dotenv.config()
const client = new OAuth2Client.OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const auth = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(404).send({message: 'No authorization header provided'})
        }
        const token = req.headers.authorization.split(" ")[1]
        const isGoogleAuth = token.length > 500

        console.log("token isGoogle?:", isGoogleAuth)
        if (!isGoogleAuth) {
            const decodedData = jwt.verify(token, process.env.TOKEN_SECRET)
            req.user = {
                isGoogle: false,
                profileObj: {
                    email: decodedData.email
                },
                token: token
            }
            req.email = decodedData?.email
        } else {
            const ticket = await client.verifyIdToken({idToken: token, audience: process.env.GOOGLE_CLIENT_ID})
            const payload = ticket.payload
            req.user = {
                isGoogle: true,
                profileObj: {
                    name: payload.name,
                    email: payload.email,
                    imageUrl: payload.picture
                },
                token: token
            }
            req.email = payload?.email
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(400).send({message: error.message})
    }
}

export default auth