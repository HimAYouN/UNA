import { ApiError } from "../../utils/ApiError.js";
import { deleteOneNoteService, getAllNotesService, getOneNoteService, updateOneNoteService, uploadMaterialService } from "./material.service.js"


export async function uploadMaterial(req, res, next) {
    try {
        const user = req.user;
        const { title, description, subject, type } = req.body
        const { universityId, courseId } = req.params
        if (!req.file) throw new ApiError("File is required", 400);
        const fileBuffer = req.file.buffer;
        const fileType = req.file.mimetype
        const result = await uploadMaterialService(user, fileBuffer, title, description, subject, type, universityId, courseId, fileType);
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

export async function getAllNotes(req, res, next) {
    try {
        const { type, page, limit } = req.query;
        const result = await getAllNotesService(type, page, limit);
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

export async function getOneNote(req, res, next) {
    try {
        const { id } = req.params

        const result = await getOneNoteService(id);
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

export async function updateOneNote(req, res, next) {
    try {
        const { id } = req.params
        const {title, description, subject} = req.body
        const result = await updateOneNoteService(id, title, description, subject)
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

export async function deleteOneNote(req, res, next){
    try {
        const { id } = req.params
        const user = req.user
        const result = await deleteOneNoteService(id, user)
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}