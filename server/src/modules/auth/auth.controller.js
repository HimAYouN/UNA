import { ApiError } from "../../utils/ApiError.js";
import { loginUserService, logoutUserService, refreshTokenService, registerUserService, verifyUserService } from "./auth.service.js"

export async function  registerUser(req, res, next){
 try {
    const {email, password} = req.body
    const result = await registerUserService(email, password);
    return res.status(200).json(result)
 } catch (error) {
    next(error)
 }

}

export async function verifyUser(req, res, next) {
   try {
      const { email, otp } = req.body
      const result = await verifyUserService(email, otp)
      return res.status(200).json(result)
   } catch (error) {
      next(error)
   }
}

export async function loginUser(req, res, next) {
   try {
      const {email, password} = req.body
      const result  = await loginUserService(email, password)
      return res
      .cookie("accessToken", result.accessToken, result.options)
      .cookie("refreshToken", result.refreshToken, result.options)
      .status(200)
      .json(result)
   } catch (error) {
      next(error)
   }   
}


//TODO - Logout
export async function logoutUser(req, res, next){
   try {
      const result = await logoutUserService(res)
      return res.status(200).json(result)
   } catch (error) {
      next(error)
   }
}

export async function handleRefreshToken(req, res, next) {
   try {
      const refreshToken  = req.cookies.refreshToken 
      const result = await refreshTokenService(refreshToken)
      return res
      .cookie("accessToken", result.accessToken, result.options)
      .json(200)
      
   } catch (error) {
      next(error)
   }
}