import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import rootRoutes from './routes/root.js'
import userRoutes from './routes/user.js'
import canRoutes from './routes/can.js'
import {exec, spawn} from 'child_process'

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json({limit: "50mb", extended: true}));
app.use(express.urlencoded({limit: "50mb", extended: true}));

app.use('', rootRoutes);
app.use('/user', userRoutes);
app.use('/can', canRoutes);

const DB = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

const compileCPP = spawn('g++', ['decryption-utils/dataOrganize1.cpp', '-o', 'decryption'])
compileCPP.stdout.on('data', (data)=> {
    console.log(data.toString());
})
compileCPP.on('close', (code)=> {
    console.log(`g++ compilation exited with code: ${code}.`);
})
compileCPP.on('error', (err)=> {
    console.log(`g++ compilation process exited with error: ${err.message}`);
})

mongoose.connect(DB, {
    useNewUrlParser:true, useUnifiedTopology:true
}).then(() => app.listen(PORT, () => 
    console.log(`Server running on port: ${PORT}`)
)).catch((err) => console.log(err.message));