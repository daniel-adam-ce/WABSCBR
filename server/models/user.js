import mongoose from 'mongoose'
import isStrongPassword from 'validator/lib/isStrongPassword.js'
import isEmail from 'validator/lib/isEmail.js'
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: [true, 'Email is required'],
        unique: true,
        validate: [isEmail, 'Enter a valid email']
    },
    dateJoined: {
        type: Date,
        default: Date.now()
    },
    vehicles: {
        type: Array,
        of: {
            type: String,
        },
        default: []
    },
    devices: {
        type: Array,
        of: {
            type: Number,
        },
        default: []
    },
    password: {
        type: String, 
        required: [true, 'Password is required'],
        default: ''
    },
    isGoogle: {
        type: Boolean,
        required: [true, 'Must specify if account is from Google'],
        default: false
    }
})

userSchema.pre('save', async function(next) {
    // check if object is new or if the password has been modified
    if ((this.isNew || this.modifiedPaths().includes('password')) && !this._doc.isGoogle){
        const reg = new RegExp(`${this._doc.displayName}`, 'i')
        if (!isStrongPassword(this._doc.password)) {
            let error = new Error('Password must contain at least 1 special character, 1 lowercase letter, 1 uppercase letter, and 1 number')
            error.code = 'PASSWORD_ERROR_STR'
            throw error
        } else {
            const salt = bcrypt.genSaltSync(10);
            this._doc.password = await bcrypt.hash(this.password, salt)
        }
    }
    next();
})



const UserData = mongoose.model('user', userSchema);
export default UserData;