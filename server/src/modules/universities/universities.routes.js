import { Router } from "express";

const router = Router()


router.get('/universities')
router.get('/universities/:id/courses')
router.get('/courses/:id/materials')
router.get('/materials/:id')


export default router;