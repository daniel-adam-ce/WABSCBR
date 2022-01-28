import CanData from '../models/can.js'
import {spawn} from 'child_process'

export const getCAN = async (req, res) => {
    try {
        let query = CanData.find()
        let num = 1
        // 1 = ascending, -1 descending (for dates -1 = newest first)
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
        if (req.query.deviceSerial) {
            query.where("deviceSerial", req.query.deviceSerial)
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
        
        // decrypt payload, may not accurately reflect how this will be handled
        // encryption/decryption is not developed yet
        // --------------------------------------------------------------
        // const AEScpp = spawn('../../AEScpp/AEScpp.exe', [can.payload])
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