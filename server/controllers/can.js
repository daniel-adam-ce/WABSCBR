import CanData from '../models/can.js'
import bcrypt from 'bcrypt'

export const getCAN = async (req, res) => {
    try {
        console.log(req.query)
        let query = CanData.find()
        let num = 1
        // 1 = ascending, -1 descending
        let sortDir = 1
        if (req.query.id) {
            query.where("_id", `${req.query.id}`)
        }
        if (req.query.num) {
            num = req.query.num
        }
        if (req.query.sort) {
            if (req.query.sort == -1) {
                sortDir = -1
            }
        }
        const can = await CanData.find(query).sort({'dateReceived': sortDir}).limit(num).exec()
        res.status(200).json(can)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const deleteCAN = async (req, res) => { 
    try {

        //res.status(200).json(...)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const createCAN = async (req, res) => { 
    try {
        const can = req.body
        const newCAN = new CanData(can)
        await newCAN.save()
        res.status(200).json(newCAN)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const updateCAN = async (req, res) => { 
    try {

        //res.status(200).json(...)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}