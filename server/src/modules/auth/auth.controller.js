import { registerUserService } from "./auth.service.js"

export async function  registerUser(req, res, next){
 try {
    const {email, password} = req.body
    const result = await registerUserService(email, password);
    return res.status(200).json(result)
 } catch (error) {
    next(error)
 }

}
