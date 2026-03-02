import { uploadMaterialService } from "./material.service.js"


export async function uploadMaterial(req, res, next) {
    try {
        const userId = req.user._id;
        const { title, description, subject, type } = req.body
        const { universityId, courseId } = req.params
        const fileBuffer = req.file.buffer;
        const fileType = req.file.mimetype
        const result = await uploadMaterialService(userId, fileBuffer);
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}