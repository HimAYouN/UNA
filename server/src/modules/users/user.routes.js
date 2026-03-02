import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
// import { roleMiddleware } from "../../middleware/role.middleware.js";
// import app from '../../app.js'

import {  updateProfile, userProfile } from "./user.controller.js";
import { userUploads } from "./user.controller.js";


const route = Router();


// REVIEW KYA MAI YEH KAR SAKTA HU 
// app.use(authMiddleware)

route.use(authMiddleware)
route.get('/me', userProfile)
route.patch('/me', updateProfile)
// route.delete('/me', deleteProfile) //REVIEW -  Will think about this later 


//Media 
route.get('/me/materials', userUploads) //TODO - Pagination
// route.get('/me/materials/:materialId', oneUserUpload)   //REVIEW - Will think about this later



export default route