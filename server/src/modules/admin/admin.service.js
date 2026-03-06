import { ApiError } from '../../utils/ApiError.js';
import { Material } from '../materials/material.model.js';
import { User } from '../users/user.model.js';

export async function adminProfileService(user) {
    try {
        if (!user) throw new ApiError('User not found, Please Login!', 400); //TODO - INN DONO K MIDDLEWARE BANA DO
        // if (user.role !=='admin') throw new ApiError("You are not authorized !")  //TODO - INN DONO K MIDDLEWARE BANA DO
        return user;
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(error.message, 500);
    }
}

export async function getPendingUploadsService(user) {
    try {
        if (!user) throw new ApiError('User not found, Please Login!', 400); //TODO - INN DONO K MIDDLEWARE BANA DO
        // if (user.role !=='admin') throw new ApiError("You are not authorized !")  //TODO - INN DONO K MIDDLEWARE BANA DO

        const pendingMaterials = await Material.find({
            status: 'pending',
        }).lean();
        return pendingMaterials;
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(error.message, 500);
    }
}

export async function patchPendingUploadsService(
    user,
    materialId,
    updateStatus
) {
    try {
        if (!user && !materialId)
            throw new ApiError('Something went south! Please try again');

        const material = await Material.findById(materialId);
        if (!material) throw new ApiError('No Media found,');

        if (!updateStatus || updateStatus == material.status)
            throw new ApiError('Please provide right option!', 404);

        material.status = updateStatus;
        material.save();

        return material;
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(error.message, 500);
    }
}

export async function getAllUsersService(page, limit) {
    try {
        ///TODO -  Yaha pe vo Math .max .min wala logic khud sy lagana hai
        page = parseInt(page) || 3;
        limit = parseInt(limit) || 2;
        const skip = (page - 1) * limit;

        const users = await User.find().skip(skip).limit(limit).lean();

        if (!users) throw new ApiError('No users find!', 401);
        return users;
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(error.message, 500);
    }
}

export async function getOneUserService(userId) {
    try {
        if (!userId)
            throw new ApiError('No userId found! Please try again ', 401);

        const user = await User.findById(userId);

        if (!user)
            throw new ApiError('No user was found, Please try again!', 401);

        return user;
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(error.message, 500);
    }
}

export async function updateOneUserService(userId, verification) {
    try {
        if (!userId) throw new ApiError('No userId , please try again', 401);
        if (verification === undefined)
            throw new ApiError('No input found! Please try again', 401);
        if (!typeof verification == 'boolean')
            throw new ApiError('No input found! Please try again', 401);
        const user = await User.findById(userId).select(
            ' -password -refreshToken -otpHash'
        );

        if (!user) throw new ApiError('No user found! Please try again', 401);

        user.isVerified = verification;
        user.save();

        return user;
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(error.message, 500);
    }
}



export async function deleteOneUserService(userId) {
    try {
        if (!userId) throw new ApiError('No userId , please try again', 401);
        
        const user = await User.findById(userId).select(
            ' -password -refreshToken -otpHash'
        );

        if (!user) throw new ApiError('No user found! Please try again', 401);

        user.isDeleted = true;
        user.save();

        return user;
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(error.message, 500);
    }
}


export async function getAllReportsService() {
    try {
        ///TODO -  Reports ka model abi nhi bna hai 
        // await Report.find().skip().limit().lean()
    } catch (error) {
        if ( error instanceof ApiError) throw error;
        throw new ApiError(error.message, 500)
    }
}


export async function getOneReportService() {
    try {
        //TODO - Report ka model abi nhi bna hai
    } catch (error) {
        if ( error instanceof ApiError) throw error;
        throw new ApiError(error.message, 500)
    }
}