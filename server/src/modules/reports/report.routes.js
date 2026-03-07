import {Router} from 'express'
import { getAllReports } from './report.controller.js'

const router = Router()

router.get('/all-reports', getAllReports)



export default router