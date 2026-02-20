import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = mongoose.Schema({
    //BASIC DETAILS
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
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

// userSchema.pre("save", async function (next) {
//     if (!this.modified("password")) return next()
//     this.password = bcrypt.hash(this.password, 10)
//     next()
// })

// userSchema.methods.isPasswordCorrect = async function (password) {
//     bcrypt.compare(password, this.password)
// }

// userSchema.methods.generateAccessToken = async function () {
//     return jwt.sign({
//         _id: this._id,
//         email: this.email,
//     }, process.env.ACCESS_TOKEN_SECRET,
//         { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN })
// }
// userSchema.methods.generateRefreshToken = async function () {
//     return jwt.sign({
//         _id: this._id,
//         email: this.email,
//     }, process.env.REFRESH_TOKEN_SECRET,
//         { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN })
// }

export const User = mongoose.model('User', userSchema)