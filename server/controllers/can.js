import CanData from '../models/can.js'
import {spawn} from 'child_process'

export const getCAN = async (req, res) => {
    try {
        let query = CanData.find()
        let num = 1
        let skip = 0
        // 1 = ascending, -1 descending (for dates -1 = newest first)
        let sortDir = 1
        let sortKey = ''
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
        if (req.query.deviceSerial) {
            query.where("deviceSerial", req.query.deviceSerial)
        }
        if(req.query.skip) {
            skip = 1 * req.query.skip
        }
        if(req.email) {
            query.where("sentBy", req.email)
        }
        if (req.query.vehicleName) {
            query.where("vehicleName", req.query.vehicleName)
        }
        if (req.query.sort) {
            sortDir = parseInt(req.query.sort[0])
            sortKey = req.query.sort[1]
        }
        let can = await CanData.find(query).skip(skip).sort({[sortKey]: sortDir}).limit(num).exec()
        res.status(200).json(can)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getTotalCAN = async (req, res) => {
    try {
        let query = {}
        if (req.query.deviceSerial){
            query = {...query, deviceSerial: req.query.deviceSerial}
        }
        if (req.email) {
            query = {...query, sentBy: req.email}
        }
        if (req.query.vehicleName){
            query = {...query, vehicleName: req.query.vehicleName}
        }
        const can = await CanData.countDocuments(query).exec()
        res.status(200).json(can)
    } catch (error) {
        res.status(500).json({message: error.message})
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
        can['sentBy'] = req.email
        // decrypt payload, may not accurately reflect how this will be handled
        // encryption/decryption is not developed yet
        // --------------------------------------------------------------
        // const AEScpp = spawn('../../aes/decryption/main.exe', [can.payload])
        // let temp_stdout = 0
        // AEScpp.stdout.on('data', function(data){ 
        //     temp_stdout = data
        // })
        // AEScpp.on('close', (code)=>{
        //     if(code == 0) {
        //         can.payload = temp_stdout
        //     } else {
        //         throw new Error("Non zero exit from AES decryption")
        //     }
        // })
        // --------------------------------------------------------------

        can.dateReceived = new Date(Date.now())
        const newCAN = new CanData(can)
        await newCAN.save()
        res.status(200).json(newCAN)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateCAN = async (req, res) => { 
    try {

        //res.status(200).json(...)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}