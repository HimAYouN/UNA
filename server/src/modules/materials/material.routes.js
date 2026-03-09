import { Router } from "express";
import {authMiddleware} from '../../middleware/auth.middleware.js'
import { upload } from "../../config/multer.js";
import { deleteOneNote, getAllNotes, getOneNote, updateOneNote, uploadMaterial } from "./material.controller.js";


const router = Router ();


router.get('/', getAllNotes) //TODO - Learn Pagination  
router.post('/', authMiddleware, upload.single("file"), uploadMaterial)
router.get('/:id', authMiddleware, getOneNote)
router.patch('/update/:id', authMiddleware, updateOneNote)
router.patch('/delete/:id', authMiddleware, deleteOneNote)


export default router;
