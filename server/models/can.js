import mongoose from 'mongoose'

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
    vehicleName: {
        type: String,
        required: true,
    },
    sentBy: {
        type: String,
        lowercase: true,
        required: true
    }
})


const CanData = mongoose.model('can', canSchema);
export default CanData;