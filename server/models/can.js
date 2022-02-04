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
    sentBy: {
        type: mongoose.Schema.ObjectId,
        default: null,
        required: true
    }
})

canSchema.pre('save', async function(next) {
    // ...
})

const CanData = mongoose.model('can', canSchema);
export default CanData;