import { ApiError } from "../../utils/ApiError.js"
import { updateProfileService, userProfileService, userUploadService } from "./user.service.js"


export async function userProfile(req, res, next) {
    try {
        const userId = req.user._id
        const result = await userProfileService(userId)
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }

}


export async function updateProfile(req, res, next) {
    try {
        const userId = req.user._id;
        const { username } = req.body
        if(!username) throw new ApiError("Please provide a username", 400)
        const result = await updateProfileService(userId, username)
        return res.status(200).json(result) 
    } catch (error) {
        next(error)
    }   
}

// export async function deleteProfile(req,res,next) {
//     try {
//         const userId = req.user._id
        
//         const result = await deleteProfileService(userId)
//         return res.status(200).json(result)
//     } catch (error) {
//         next(error)
//     }
    
// }



//UPLOADS 
export async function userUploads(req, res, next){
    try {
        const userId = req.user._id;
        const {page, limit} = req.query
        const result = await userUploadService(userId, page, limit)
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}



// export async function userUpload( req, res, next){
//     try {
//         const userId = req.user._id;
//         const result = await userUploadService (userId)
//         return res.status(200).json(result)
//     } catch (error) {
//         next( error )
//     }
// }


// export async function userAllUploads ( req, res, next) {
//     try {
        
//     } catch (error) {
//         next(error)
//     }
// }

// export async function userDeleteUplaod(req, res, next) {
//     try {
        
//     } catch (error) {
//         next(error)
//     }
// }