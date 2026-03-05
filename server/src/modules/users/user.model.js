import mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { TEMPORARY_TOKEN_EXPIRY } from '../../constants.js'



const userSchema = new mongoose.Schema({
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
    otpAttemptTime: Date,
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
    refreshTokens: [
        {
            tokenHash: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
            },
        }
    ],



}, { timestamps: true })

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.isRefreshTokenCorrect = async function (refreshToken) {
    return await bcrypt.compare(refreshToken, this.refreshTokens.tokenHash)
}

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        role: this.role,
    }, process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN })
}
userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        role: this.role,
    }, process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN })
}
userSchema.methods.generateTemporaryToken = function () {
    const unHashedToken = crypto.randomBytes(20).toString("hex")

    const hashedToken = crypto
        .createHash("sha256")
        .update(unHashedToken)
        .digest("hex")

    const tokenExpiry = Date.now() + TEMPORARY_TOKEN_EXPIRY
    return { unHashedToken, hashedToken, tokenExpiry }
}

export const User = mongoose.model('User', userSchema)