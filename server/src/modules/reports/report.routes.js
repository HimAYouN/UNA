import {Router} from 'express'
import { getAllReports, makeReport } from './report.controller.js'
import { authMiddleware } from '../../middleware/auth.middleware.js'

const router = Router()


router.use(authMiddleware)

router.get('/all-reports', getAllReports)

router.post('/report', makeReport)



export default router