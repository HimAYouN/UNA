import {Router} from 'express'


const router = Router()

router.get('/me', adminProfile)

//materials
router.get('pending-uploads', getPendingUploads)
router.patch('pending-uploads', getPendingUploads)

//Users
router.get('/users', getAllUsers)
router.get('/user/:userId', getOneUser)
router.patch('/user/:userId', updateOneUser)
router.delete('/user/:userId', deleteOneUser)


//Reports
router.get('/reports', getAllReports)
router.get('report/:reportId', getOneReport)
