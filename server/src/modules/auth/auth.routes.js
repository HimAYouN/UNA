import { Router } from 'express'
import { loginUser, registerUser } from './auth.controller.js'

const router = Router()
router.route('/register').post(registerUser)
router.post('/login', loginUser)

export default router