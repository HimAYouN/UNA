import { healthCheckService } from "./health.service.js"

export async function healthCheck(req, res, next){
    try {
        const result = healthCheckService()
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}