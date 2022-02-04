import mongoose from 'mongoose'

import isEmail from 'validator/lib/isEmail.js'

const canSchema = mongoose.Schema({
    arbId: {
        type: Number,
        default: -1,
    },
    payload: {
        type: Number,
        default: -1,
    },
    dateReceived: {
        type: Date,
        default: Date.now()
    },
    deviceSerial: {
        type: Number,
        required: true
    },
    sentBy: {
        type: String,
        lowercase: true,
        required: [true, 'Email is required'],
        unique: true,
        validate: [isEmail, 'Enter a valid email']
    }
})

canSchema.pre('save', async function(next) {
    // ...
})

const CanData = mongoose.model('can', canSchema);
export default CanData;