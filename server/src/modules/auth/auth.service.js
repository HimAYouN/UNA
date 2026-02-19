
import { ApiError } from "../../utils/ApiError.js";
import { generateOTP, hashOTP } from "../../utils/otp";
import { User } from "../users/user.model.js";
import bcrypt from 'bcrypt'

export async function registerUserService(email, password) {
    const existingUser = await User.findOne({ email })
    if (existingUser && existingUser.isVerified) throw new ApiError("User already exists", 409)

    if (existingUser && !existingUser.isVerified) {

        const otp = generateOTP();

        const hashedOTP = hashOTP(otp);

        existingUser.otpHash = hashedOTP
        existingUser.otpExpiresAt = new Date(Date.now() + 5*60* 1000)
        existingUser.otpAttempts = 0;

        await existingUser.save();

        // await existingUser.update({ otpHash:hashedOTP, otpAttempts :0, otpExpiresAt:new Date(Date.now() + 5 * 60 * 1000) })
        return { message: "Verification code sent" }
    }

    let baseUsername = email.split('@')[0]
    let username = baseUsername
    let counter = 1


    while(await User.findOne({username})) {
        username = `${baseUsername}_${counter}`;
        counter++;
    } 

    const otp = generateOTP();

    const otpHash  = hashOTP(otp);

    const passwordHash  = await bcrypt.hash(password, 10)
    const user = await User.create({ email, passwordHash, username, otpHash, otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000), isVerified: false, otpAttempts: 0})


    ////SENDING EMAIL LOGIC YAHA P LKHNA HAI ?////

    return { message: "Verification code sent" }
}
