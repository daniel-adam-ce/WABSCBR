import UserData from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import OAuth2Client from 'google-auth-library'
import dotenv from 'dotenv'
dotenv.config()

const client = new OAuth2Client.OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export const getUser = async (req, res) => {
    console.log(req.body)
    try {
        let query = UserData.find()
        if (req.query.id) {
            query.where("_id", `${req.query.id}`)
        }
        if (req.query.email) {
            query.where("email", `${req.query.email}`)
        }
        const user = await UserData.findOne(query).exec()
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const deleteUser = async (req, res) => { 
    try {
        
        if (req.query.id) {
            let id = req.query.id
            await UserData.findByIdAndDelete(id).exec()
        } else {
            throw new Error('Must provide id')
        }
        res.status(200).json('Deletion successful')
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}


export const googleAuth = async (req, res) => {
    try {
        const { tokenId } = req.body
        const ticket = await client.verifyIdToken({idToken: tokenId, audience: process.env.GOOGLE_CLIENT_ID})
        const payload = ticket.payload
        if (payload.email_verified) {
            let query = UserData.findOne()
            query.where("email", payload.email)
            let user = await UserData.findOne(query).exec()
            if (user === null) {
                const newUser = new UserData({
                    email: payload.email,
                    dateJoined: new Date(Date.now()),
                    isGoogle: true,
                    password: 'none',
                })
                const res = await newUser.save()
                user = newUser
            }
            res.status(200).json({message: 'Google login successful'})
        } else {
            throw new Error('Email is not verified')
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}


export const getVehiclesAndDevices = async (req, res) => {
    try {
        
        let query = UserData.find()
        if (req.email) {
            query.where("email", req.email)
        } else {
            throw new Error('Email must be provided')
        }
        const user = await UserData.findOne(query).exec()
        res.status(200).send([user.vehicles, user.devices])
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}

export const addVehicleOrDevice = async (req, res) => { 
    try {
        let query = UserData.find()

        const checkUniqueAndAdd = (object, field, itemToAdd) => {
            if (object[`${field}`].findIndex((element)=> (
                element == itemToAdd
            ))==-1) {
                object[`${field}`].push(itemToAdd)
            } else {
                throw new Error(`Attempt to add item in ${field} failed. Item already exists.`)
            }
        }

        if (req.email) {
            query.where("email", req.email)
        } else {
            throw new Error('Email must be provided')
        }

        if (!(req.body.vehicleName || req.body.deviceSerial)){
            throw new Error('Must provide vehicle name or device serial number')
        }
        
        let user = await UserData.findOne(query).exec()
        if (req.body.vehicleName) {
            checkUniqueAndAdd(user, 'vehicles', req.body.vehicleName)
        } 
        if (req.body.deviceSerial) {
            checkUniqueAndAdd(user, 'devices', req.body.deviceSerial)
        }
        await user.save()
        res.status(200).json({message: 'Device or vehicle successfully added'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const loginUser = async (req, res) => {
    try {
        let query = UserData.find()
        if (req.query.email) {
            query.where("email", req.query.email)
        } else {
            return res.status(400).json({message: {error: 'Must provide email', type: 'email'}})
        }
        const user = await UserData.findOne(query).exec()
        if (!user) {
            return res.status(400).json({message: {error: 'No account exists with the given id or email', type: 'email'}})
            // throw new Error("No account exists with the given id or email")
        }
        const passwordCompare = bcrypt.compareSync(req.query.password, user.password)
        
        if (passwordCompare) {
            const token = jwt.sign({email: user.email}, process.env.TOKEN_SECRET, { expiresIn: '1h'})
            return res.status(200).json({profileObj: {email: user.email}, token: token, isGoogle: false}) 
        } else {
            return res.status(400).json({message: {error: 'Wrong password', type: 'password'}})
            // throw new Error("Passwords do not match")
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const createUser = async (req, res) => { 
    try {
        const {email, emailConfirm, password, passwordConfirm} = req.body;
        let data = {errors: []};
        const checkUser = await UserData.findOne({email: email}).exec()
        if (checkUser) {
            data['errors'].push({
                message: "User already exists with this email", 
                type: "email"
            })
        }
        if (email !== emailConfirm) {
            data['errors'].push({
                message: "Emails must match", 
                type: "email"
            })
        }
        if (password !== passwordConfirm) {
            data['errors'].push({
                message: "Passwords must match", 
                type: "password"
            })
        }
        if (data['errors'].length !== 0) {
            return res.status(400).json({message: data})
        }

        const user = {email: email, password: password}
        const newUser = new UserData(user)
        await newUser.save()
        res.status(200).json({message: 'User created'})
    } catch (error) {
        let data = {errors: []}
        console.log(error)
        if (error.name === 'ValidationError') {
            console.log('mongoose')
            for (let field in error.errors) {
                console.log(error.errors[field].message)
                data['errors'].push({
                    message: error.errors[field].message,
                    type: field
                })
            }
        }
        if (error.code === 'PASSWORD_ERROR_STR') {
            data['errors'].push({message: error.message, type: 'password'})
        }
        
        res.status(400).json({message: data, error: error.message})
    }
}

export const verifyToken = async (req, res) => {
    try {
        res.status(200).json({message: `${req.email} token verified`})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


// **********************************************************************************
// to be added later
//
// export const updateUser = async (req, res) => { 
//     try {
//         let query = UserData.find()
//         if (req.query.id) {
//             query.where("_id", `${req.query.id}`)
//         } else if (req.query.email) {
//             query.where("email", req.query.email)
//         } else {
//             throw new Error('Must provide id or email')
//         }
//         const user = await UserData.findOne(query).exec()
//         if (req.body.password) {
//             user.password = req.body.password
//         }
//         await user.save()
//         res.status(200).json(user)
//     } catch (error) {
//         res.status(400).json({message: error.message})
//     }
// }
// **********************************************************************************