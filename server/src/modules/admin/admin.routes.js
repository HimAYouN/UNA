import {Router} from 'express'
import { adminProfile, deleteOneUser, getAllReports, getAllUsers, getOneReport, getOneUser, getPendingUploads, patchPendingUpload, updateOneUser } from './admin.controller.js'
import { authMiddleware } from '../../middleware/auth.middleware.js'
import { roleMiddleware } from '../../middleware/role.middleware.js'


const router = Router()


router.use(authMiddleware)
// router.use(roleMiddleware)

router.get('/me', adminProfile)

//materials
router.get('/pending-uploads',  getPendingUploads)
router.patch('/pending-upload/:materialId', patchPendingUpload)

//Users
router.get('/users', getAllUsers)
router.get('/user/:userId', getOneUser)
router.patch('/user/update/:userId', updateOneUser)
router.patch('/user/delete/:userId', deleteOneUser)


//Reports
router.get('/reports', getAllReports)
router.get('/report/:reportId', getOneReport)


export default router