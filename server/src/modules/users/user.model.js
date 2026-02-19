import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    //BASIC DETAILS
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false,
    },


    //OTP 
    otpHash: String,
    otpExpiresAt: Date,
    otpAttempts: {
        type: Number,
        default: 0
    },

    //LockSys
    failedLoginAttempts: {
        type: Number,
        default: 0,

    },
    lockUntil: {
        type: Date,
        default: null
    },


    //Session
    refreshTokens: [{
        tokenHash: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
        },
    }],



}, { timestamps: true })

export const User = mongoose.model('User', userSchema)