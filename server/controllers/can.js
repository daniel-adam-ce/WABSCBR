import CanData from '../models/can.js'
import {exec, spawn} from 'child_process'
import { cwd } from 'process'
import { execFile } from 'child_process'

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
        // this is un-safe
        const can = req.body;
        can['sentBy'] = req.id;
        console.log('cwd:', cwd())
        console.log('path', process.env.PATH);
        console.log(`${cwd()}/decryption`)
        console.log(can);
        if (can.key) {
            const aesCPP = spawn(`${cwd()}/decryption`, [can?.payload, can?.key]);
            let temp_stdout = 0;
            aesCPP.stdout.on('data', function(data){
                temp_stdout = data.toString();
                console.log(`stdout: ${temp_stdout}`)
            })
            aesCPP.on('close', (code)=>{
                if(code == 0) {
                    temp_stdout = temp_stdout.replace('\r', '')
                    temp_stdout = temp_stdout.replace('\n', '')
                    console.log(`Decryption finished with output: ${temp_stdout}...`)
                    can.payload = temp_stdout;
                    can.dateReceived = new Date(Date.now());
                    delete can.key;
                    console.log(can)
                    const newCAN = new CanData(can);
                    newCAN.save().then((r)=>{
                        res.status(200).json(newCAN);
                    }).catch((r)=>{
                        res.status(500).json({message: r.message});
                    })
                    
                } else {
                    res.status(400).json({message: `Non-zero exit from AES decryption with code: ${code}`})
                    console.log(`Non-zero exit from AES decryption with code: ${code}`);
                }
            })
            aesCPP.on('error', (error)=> {
                console.log(`AES decryption exited with error: ${error.message}`)
            })
        } else {
            const newCAN = await new CanData(can);
            await newCAN.save();
            res.status(200).json({message: newCAN});
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
}

export const testCAN = async (req, res) => {
    try {
        const can = {
            arbId: 0,
            payload: '00112233445566778899aabbccddeeff',
            key: '000102030405060708090a0b0c0d0e0f',
            deviceSerial: 46,
            vehicleName: 'Honda Civic'
        }
        can['sentBy'] = req.id;
        console.log('cwd:', cwd())
        console.log('path', process.env.PATH);
        // const test = spawn('ls');
        // test.stdout.on('data', function(data){
        //     console.log('ls', data.toString());
        // })
        // test.on('error', (error)=> {
        //     console.log(`ls exited with error: ${error.message}`)
        // })
        console.log(`${cwd()}/decryption`)
        console.log(can);
        if (can.key) {
            const aesCPP = spawn(`${cwd()}/decryption`, [can?.payload, can?.key]);
            let temp_stdout = 0;
            aesCPP.stdout.on('data', function(data){
                temp_stdout = data.toString();
                console.log(`stdout: ${temp_stdout}`)
            })
            aesCPP.on('close', (code)=>{
                if(code == 0) {
                    temp_stdout = temp_stdout.replace('\r', '')
                    temp_stdout = temp_stdout.replace('\n', '')
                    console.log(`Decryption finished with output: ${temp_stdout}...`)
                    can.payload = temp_stdout;
                    can.dateReceived = new Date(Date.now());
                    delete can.key;
                    console.log(can)
                    const newCAN = new CanData(can);
                    // newCAN.save().then((r)=>{
                    //     res.status(200).json(newCAN);
                    // }).catch((r)=>{
                    //     res.status(500).json({message: r.message});
                    // })
                    
                } else {
                    res.status(400).json({message: `Non-zero exit from AES decryption with code: ${code}`})
                    console.log(`Non-zero exit from AES decryption with code: ${code}`);
                }
            })
            aesCPP.on('error', (error)=> {
                console.log(`AES decryption exited with error: ${error.message}`)
            })
        } else {
            const newCAN = await new CanData(can);
            await newCAN.save();
            res.status(200).json({message: newCAN});
        }
        
        // --------------------------------------------------------------

        // res.status(200).json({message: "test"})
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