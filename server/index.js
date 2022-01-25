import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())

app.use(express.json({limit: "50mb", extended: true}))
app.use(express.urlencoded({limit: "50mb", extended: true}));

// for routes later
// app.use(...) 
// app.use(...)

const DB = process.env.MONGODB_URI
const PORT = process.env.PORT || 5000

mongoose.connect(DB, {
    useNewUrlParser:true, useUnifiedTopology:true
}).then(() => app.listen(PORT, () => 
    console.log(`Server running on port: ${PORT}`)
)).catch((err) => console.log(err.message));