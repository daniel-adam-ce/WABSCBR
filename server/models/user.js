import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    // ...
})

UserSchema.pre('save', async function(next) {
    // ...
})

const UserData = mongoose.model('user', userSchema);
export default UserData;