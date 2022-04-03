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
            query.where("_id", `${req.id}`)
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
        if(req.id) {
            query.where("sentBy", req.id)
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
        if (req.id) {
            query = {...query, sentBy: req.id}
        }
        console.log(req.id)
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
        const can = req.body;
        console.log(req.id);
        can['sentBy'] = req.id;
        console.log(can)
        // decrypt payload, may not accurately reflect how this will be handled
        // encryption/decryption is not developed yet
        // --------------------------------------------------------------
        const AEScpp = spawn('C:/Users/Daniel/Desktop/course_content/s8-spring-2022/ece186b/repos/WABSCBR-server/server/utils/decryption.exe', [can?.payload, can?.key]);
        let temp_stdout = 0;
        AEScpp.stdout.on('data', function(data){ 
            console.log(data.toString())
            temp_stdout = data.toString();
        })
        AEScpp.on('close', (code)=>{
            if(code == 0) {
                console.log(temp_stdout)
                temp_stdout = temp_stdout.replace('\r', '')
                temp_stdout = temp_stdout.replace('\n', '')
                can.payload = temp_stdout;
                can.dateReceived = new Date(Date.now());
                delete can.key;
                console.log(can)
                const newCAN = new CanData(can);
                newCAN.save().then((r)=>{
                    res.status(200).json(newCAN);
                }).catch((r)=>{
                    res.status(500).json({message: error.message});
                })
                
            } else {
                res.status(400).json({message: 'Non-zero exit from AES decryption'})
                console.log('Non-zero exit from AES decryption');
            }
        })
        // --------------------------------------------------------------

        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
}

export const updateCAN = async (req, res) => { 
    try {

        //res.status(200).json(...)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}