import { ApiError } from "../../utils/ApiError.js";
import { cloudinary } from "../../config/cloudinary.js";
import { User } from '../users/user.model.js'
import { Material } from "./material.model.js";

export async function uploadMaterialService(userId, fileBuffer, title, description, subject, type, universityId, courseId, fileType) {
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
            // description, 
            // universityId, 
            // courseId, 
            type,
            subject,
            fileUrl: uploadResult.secure_url,
            publicId: uploadResult.public_id,
            fileType,
            fileSiFze: uploadResult.bytes,
            uploadedBy: user._id
        })
        if (!material) throw new ApiError("Something went wrong while uploading your media", 500)


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

export async function getAllNotesService(type, page, limit) {
    try {
        if (!type) throw new ApiError("Please select a type!", 400)
        page = Math.max(parseInt(page) || 1, 1)
        limit = Math.min(parseInt(limit) || 10, 10)


        const skip = (page - 1) * limit

        const materials = await Material.find({ type: type })
            .skip(skip)
            .limit(limit)
            .lean()


        return materials;
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(error.message, 500)
    }
}


export async function getOneNoteService(materialId) {
    try {
        if (!materialId) throw new ApiError("Something went south : No materail Id", 400);

        const material = await Material.findById(materialId)

        if (!material) throw new ApiError("No Material found !", 404)
        return material
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(error, 500)
    }
}

export async function updateOneNoteService(materialId, title, description, subject) {
    try {
        if (!materialId) throw new ApiError("Something went south : No materail Id", 400)

        if (!title && !description && !subject) throw new ApiError("Atleast one field is required", 400)

        const updateFields = {}
        if (title) updateFields.title = title
        if (description) updateFields.description = description
        if (subject) updateFields.subject = subject

        if (Object.keys(updateFields).length == 0) throw new ApiError("Atleast one field is required", 400)


        const material = await Material.findByIdAndUpdate(
            materialId,
            { $set: updateFields },
            { new: true, runValidator: true }
        )

        if (!material) throw new ApiError("Something went south, Couldn't find your material.", 404)

        return material
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(error.message, 500);
    }
}

export async function deleteOneNoteService(materialId) {
    try {
        if (!materialId) throw new ApiError("Something went south : No materail Id", 400)

        const material = await Material.findById(materialId)
        if (!material) throw new ApiError("Something went south, Couldn't find your material.", 404)
        material.isDeleted = true
        await material.save()
        return {message: "Document deleted successfully"}
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(error.message, 500)
    }
}