import { Router } from 'express'
import { loginUser, registerUser, verifyUser } from './auth.controller.js'

const router = Router()
router.route('/register').post(registerUser)
router.post('/login', loginUser)
router.post('/verification', verifyUser)

export default router