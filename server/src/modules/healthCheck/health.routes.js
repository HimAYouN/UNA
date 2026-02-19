import { Router } from "express";
import { healthCheck } from "./health.controller.js";

const router = Router()

router.get('/health-check', healthCheck)

export default router