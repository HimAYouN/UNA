import { ApiError } from "../../utils/ApiError.js"
import { Material } from "../materials/material.model.js";
import { User } from "./user.model.js";


export async function userProfileService(userId) {

    try {
        if (!userId) throw new ApiError("Something went south! No userId found", 400)
        const userDoc = await User.findById(userId).select(
            "-password -otpHash -refreshTokens"
        ).lean()
        if (!userDoc) throw new ApiError("Something went south! No user found", 404)

        return userDoc
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(error.message, 500);
    }

}

export async function updateProfileService(userId, username) {
    try {
        if (!userId) throw new ApiError("Something went south! No userId found", 400)
        if (!username) throw new ApiError("Username field is required", 400)

        const existing = await User.findOne({ username }).select('_id')
        const user = await User.findById(userId)
        if (!user) throw new ApiError("Something went south! No user found", 404)
        if (existing && existing._id.toString() !== user._id.toString()) throw new ApiError("Oppsie user already exists", 409)


        user.username = username
        await user.save()
        const updatedUser = user.toObject()

        delete updatedUser.password
        delete updatedUser.refreshTokens
        delete updatedUser.otpHash


        return updatedUser;
    } catch (error) {
        if (error instanceof ApiError) throw error
        throw new ApiError(error.message, 500)
    }
}

export async function userUploadService(userId, page, limit) {
    try {
        if (!userId) throw new ApiError("Something went south! No userId found", 400)
        page = Math.max( parseInt(page) || 1, 1) ////YAHA PE LOGIC FLOW DAEKHNA HAI 
        limit = Math.min(parseInt(limit) || 10 , 10) ////YAHA PE LOGIC FLOW DAEKHNA HAI 
        
        
        const skip = (page - 1) * limit
        
        
        const [materials, total] = await Promise.all([
            Material.find({ uploadedBy: userId })
            .skip(skip)
            .limit(limit)
            .lean(),
            Material.countDocuments({ uploadedBy: userId })  // countDoc is mongoose wrapper (method ) and will give me data like : count of  material -> uploadedBy (this userId ) 
        ])
        return {
            data: materials,
            page,
            limit,
            total, 
            totalPages: Math.ceil(total/limit)
        }


    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(error.message, 500)
    }
}