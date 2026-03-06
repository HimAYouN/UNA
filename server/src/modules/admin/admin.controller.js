import { adminProfileService, deleteOneUserService, getAllReportsService, getAllUsersService, getOneReportService, getOneUserService, getPendingUploadsService, patchPendingUploadsService, updateOneUserService } from "./admin.service.js"


export async function adminProfile(req, res, next) {
    try {
        console.log("Hello")
        const user = req.user
        const result = await adminProfileService(user)
        return res.status(200).json(result)

    } catch (error) {
        next(error)
    }
    
}
export async function getPendingUploads(req, res, next) {
    try {
        const user = req.user
        const result = await getPendingUploadsService(user)
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
    
}

export async function patchPendingUpload(req, res, next) {
    try {
        const user = req.user
        const {materialId} = req.params
         const {updateStatus} = req.body
         console.log(updateStatus)
        const result = await patchPendingUploadsService(user, materialId, updateStatus)
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
    
}

export async function getAllUsers(req, res, next) {
    try {
        const {page, limit} = req.query
        const result = await getAllUsersService(page, limit)
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
    
}

export async function getOneUser(req, res, next) {
    try {
        const {userId} = req.params
        const result = await getOneUserService(userId)
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
    
}

export async function updateOneUser(req, res, next) {
    try {
        const {userId} = req.params
        const {verification} = req.body
        const result = await  updateOneUserService(userId, verification)
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
    
}

export async function deleteOneUser(req, res, next) {
    try {
        const {userId} = req.params
        const result = await deleteOneUserService(userId)
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
    
}

export async function getAllReports(req, res, next) {
    try {
        const result = await getAllReportsService()
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
    
}

export async function getOneReport(req, res, next) {
    try {
        const result = await getOneReportService()
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
    
}

