import mongoose from 'mongoose'

const CanSchema = mongoose.Schema({
    // ...
})

CanSchema.pre('save', async function(next) {
    // ...
})

const CanData = mongoose.model('can', userSchema);
export default CanData;