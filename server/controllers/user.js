import UserData from '../models/user.js'
import bcrypt from 'bcrypt'

export const getUser = async (req, res) => {
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

export const loginUser = async (req, res) => {
    try {
        let query = UserData.find()
        if (req.query.id) {
            query.where("_id", `${req.query.id}`)
        } else if (req.query.email) {
            query.where("email", req.query.email)
        } else {
            throw new Error('Must provide id or email')
        }
        const user = await UserData.findOne(query).exec()
        if (user === null) {
            throw new Error("No account exists with the given id or email")
        }
        const cmp_pass = bcrypt.compareSync(req.query.password, user.password)
        
        if (cmp_pass) {
            res.status(200).json({...user, message: "Passwords match"}) 
        } else {
            throw new Error("Passwords do not match")
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const createUser = async (req, res) => { 
    try {
        const user = req.body
        const newUser = new UserData(user)
        await newUser.save()
        res.status(200).json(newUser)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const updateUser = async (req, res) => { 
    try {
        let query = UserData.find()
        if (req.query.id) {
            query.where("_id", `${req.query.id}`)
        } else if (req.query.email) {
            query.where("email", req.query.email)
        } else {
            throw new Error('Must provide id or email')
        }
        const user = await UserData.findOne(query).exec()
        if (req.body.password) {
            user.password = req.body.password
        }
        await user.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}