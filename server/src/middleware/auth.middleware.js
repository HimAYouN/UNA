import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/ApiError.js';

export async function  authMiddleware (req, res, next) {
    try {
        const accessToken = req.cookies.accessToken 
        //TODO - Access token cookies aur header sy lena hai taki phone mai b kaam kare 
        if(!accessToken) throw new ApiError("Something went south! Invalid or expired access token")
        // console.log(accessToken);
        const decodedPayload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        // console.log(decodedPayload)
        req.user = decodedPayload;
        next()
    } catch (error) {
         next(error)
    }
}