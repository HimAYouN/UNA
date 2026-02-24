import { Router } from 'express'
import { loginUser, logoutUser, registerUser, verifyUser } from './auth.controller.js'
import { registerSchema } from './auth.validation.js'

const router = Router()
// router.route('/register').post(registerUser)
router.post('/register',  registerUser)
router.post('/verification', verifyUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

export default router