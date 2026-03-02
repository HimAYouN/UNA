import { Router } from "express";
import {authMiddleware} from '../../middleware/auth.middleware.js'
import { upload } from "../../config/multer.js";
import { uploadMaterial } from "./material.controller.js";


const router = Router ();


// router.get('/materials?type=notes', getAllNotes) //TODO - Learn Pagination 
// router.get('/materials?type=pyq', getAllNotes) //TODO - Learn Pagination 
// router.get('/materials/:id', getOneNote)
router.post('/', authMiddleware, upload.single("file"), uploadMaterial)
// router.patch('/materials/:id', updateOneNote)
// router.delete('/materials/:id', deleteOneNote)


export default router;
