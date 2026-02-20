import { loginUserService, registerUserService } from "./auth.service.js"

export async function  registerUser(req, res, next){
 try {
    const {email, password} = req.body
    const result = await registerUserService(email, password);
    return res.status(200).json(result)
 } catch (error) {
    next(error)
 }

}

export async function loginUser(req, res, next) {
   try {
      const {email, password} = req.body
      const result  = await loginUserService(email, password)
      return res.status(200).json(result)
   } catch (error) {
      next(error)
   }   
}
