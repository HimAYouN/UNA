

import { randomInt } from "crypto";
import { OTP_ATTEMPT_TIME, OTP_EXPITY_TIME } from "../../constants.js";
import { ApiError } from "../../utils/ApiError.js";
import { generateOTP, hashOTP } from "../../utils/otp.js";
import { User } from "../users/user.model.js";
import bcrypt from 'bcrypt'


const generateRefreshAndAccessToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const refreshToken = await user.generateRefreshToken();
        const accessToken = await user.generateAccessToken();

        user.accessToken = accessToken
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError("Something went south while generating token", 500)
    }
}


export async function registerUserService(email, password) {

    try {
        if ([email, password].some((field) => field?.trim() === "")) throw new ApiError("All fields are required", 409)
        const existingUser = await User.findOne({ email })
        if (existingUser && existingUser.isVerified) throw new ApiError("User already exists", 409)

        if (existingUser && !existingUser.isVerified) {
            if (existingUser.otpAttemptTime && Date.now() < existingUser.otpAttemptTime.getTime()) { throw new ApiError(`Please try again after ${existingUser.otpAttemptTime}`, 409) }
            const otp = generateOTP();

            const hashedOTP = hashOTP(otp);

            existingUser.otpHash = hashedOTP
            existingUser.otpExpiresAt = new Date(Date.now() + OTP_EXPITY_TIME)
            existingUser.otpAttempts = 0;

            await existingUser.save();

            //TODO SEND OTP IN EMAIL 
            return { message: `Verification code: ${otp} sent` }
        }

        let baseUsername = email.split('@')[0]
        let username = baseUsername
        let counter = randomInt(0, 10000).toString().padStart(4, '0');



        while (await User.findOne({ username })) {
            username = `${baseUsername}_${counter}`;
            counter++;
        }

        const otp = generateOTP();

        const otpHash = hashOTP(otp);

        const user = await User.create({ email, password, username, otpHash, otpExpiresAt: new Date(Date.now() + OTP_EXPITY_TIME), isVerified: false, otpAttempts: 0 })

        const createdUser = await User.findById(user._id).select(
            "-password -refreshTokens -otpHash"
        )
        
        if (!createdUser) { throw new ApiError("Something went south! while creating user", 500) }
        console.log(createdUser)

        ////TODO SENDING EMAIL LOGIC YAHA P LKHNA HAI ?////
        return { message: `Verification code: ${otp} sent, next time it will be sent to ${createdUser.email} Hopefully!`, createdUser }

    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(error.message, 500);
    }
}


export async function verifyUserService(email, otp) {
    try {

        const existingUser = await User.findOne({ email })

        if (!existingUser) { throw new ApiError("Invalid email or password", 409); }

        if (existingUser.isVerified) { throw new ApiError("User Already verified", 409) }

        if (existingUser.otpAttemptTime && Date.now() < existingUser.otpAttemptTime.getTime()) { throw new ApiError(`Please try again after ${existingUser.otpAttemptTime}`, 409) }
        if (existingUser.otpExpiresAt && existingUser.otpExpiresAt.getTime() < Date.now()) { throw new ApiError("OTP expired!", 409) }

        const otpHash = hashOTP(otp)
        if (existingUser.otpHash !== otpHash) {
            existingUser.otpAttempts = existingUser.otpAttempts + 1
            if (existingUser.otpAttempts >= 3) {
                existingUser.otpAttemptTime = new Date(Date.now() + OTP_ATTEMPT_TIME)
                // existingUser.otpAttemptTime = new Date(Date.now() + 1000*60*2)
                existingUser.otpAttempts = 0
                await existingUser.save()
                { throw new ApiError(`You have exceeded otp trials, Please try again after ${existingUser.otpAttemptTime}`, 409); }
            }

            await existingUser.save();

            throw new ApiError("OTP did not match", 409);
        }


        existingUser.isVerified = true
        existingUser.otpAttempts = 0
        existingUser.otpAttemptTime = null
        existingUser.otpHash = null
        existingUser.otpExpiresAt = null
        await existingUser.save()

        //TODO - EMAIL => VERIFIED SUCCESSFULLY
        return { message: `User ${existingUser.username} verified successfully` }

    } catch (error) {
        if (error instanceof ApiError) { throw error };
        throw new ApiError(error.message, 500);
    }
}



export async function loginUserService(email, password) {


    try {
        if (email.trim() == "" || password.trim() == "") throw new ApiError("Invalid email or password", 401);

        const user = await User.findOne({ email });

        if (!user) throw new ApiError("Invalid email or password", 401);


        if (! await user.isPasswordCorrect(password)) throw new ApiError("Invalid email or password", 401)


        if (!user.isVerified) throw new ApiError("User not verified Please verify your email before login!", 409)


        const { accessToken, refreshToken } = await generateRefreshAndAccessToken(user._id)

        //TODO -  Store tokens in DB for multiple devices in hashed format

        const hashRefreshToken = await bcrypt.hash(refreshToken, 10)


        const LoggedInUser = await User.findById(user._id).select("-password -refreshTokens -otpHash")


        const options = {
            httpOnly: true,
            secure: true
        }




        //TODO - EMAIL => LOGGED IN SUCCESSFULLY
        return { message: `LoggedIn successfully: ${email}`, options, refreshToken, accessToken, LoggedInUser }
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(error.message, 500);
    }
}


export async function logoutUserService() {

}