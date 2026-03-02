import { ApiError } from "../../utils/ApiError.js";
import { cloudinary } from "../../config/cloudinary.js";
import { User } from '../users/user.model.js'
import { Material } from "./material.model.js";

export async function uploadMaterialService(userId, fileBuffer) {
    try {
        if (!userId) throw new ApiError("Opps No user Found!", 400)

        const user = await User.findById(userId);
        if (!user) throw new ApiError("Opps No user Found!", 404)


        //NOTE - Cloudinary ka code 
        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader
                .upload_stream({
                    resource_type: "raw",
                    folder: "materials"
                },
                    (error, result) => {
                        if (error) return reject(error)
                        resolve(result)
                    }
                )
            stream.end(fileBuffer)
        })

        const material = await Material.create({
            title, 
            description, 
            universityId, 
            courseId, 
            type, 
            subject, 
            fileUrl: uploadResult.secure_url, 
            publicId: uploadResult.public_id, 
            fileType, 
            fileSiFze: uploadResult.bytes, 
            uploadedBy: user._id
        })
        if(!material ) throw new ApiError("Something went wrong while uploading your media", 500)


        return {
            userId: user._id,
            materialId: material._id,
            public_id: uploadResult.public_id,
            fileUrl: uploadResult.secure_url,
            size: uploadResult.bytes
        }

    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(error.message, 500)
    }
}