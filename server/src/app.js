import express from 'express'
import { ROUTE_VERSION } from './constants.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

import healthRouter from './modules/healthCheck/health.routes.js';
import authRouter from './modules/auth/auth.routes.js'
import userRouter from './modules/users/user.routes.js'
import materialRouter from './modules/materials/material.routes.js'
 
const app = express() 

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"))
app.use(cookieParser())

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(`${ROUTE_VERSION}`, healthRouter)
app.use(`${ROUTE_VERSION}/user`,authRouter)
app.use(`${ROUTE_VERSION}/user`, userRouter)
app.use(`${ROUTE_VERSION}/materials`, materialRouter)

export default app;