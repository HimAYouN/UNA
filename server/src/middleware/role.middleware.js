
import { ApiError } from "../utils/ApiError.js"
import jwt from 'jsonwebtoken'



//NOTE -  BROKEN LOGIC, LOGIC NEEDS TWEEKS 
export async function roleMiddleware(req, res, next) {
    try {
        //TODO - AccessToken header mai sy b lena hai
        const accessToken = req.cookies.accessToken
        const usersRole = req.user.role
        if(!accessToken)  throw new ApiError("Something went south! Please Login again")
        const decodedPayload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        console.log(decodedPayload)
        // // console.log(user.schema.tree.role)  //TODO -  ESS KA SHORT DOONDNA HAI 
        // console.log(role)
        if (usersRole !== 'admin') throw new ApiError("You are not authorized!") 
        // req.userRole = decodedPayload.role
        next()
    } catch (error) {
        next(error)
    }
}