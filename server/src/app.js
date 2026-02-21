import express from 'express'
import healthRouter from './modules/healthCheck/health.routes.js';
import authRouter from './modules/auth/auth.routes.js'
import { ROUTE_VERSION } from './constants.js';
import cookieParser from 'cookie-parser';

const app = express() 

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"))
app.use(cookieParser())

app.use(`${ROUTE_VERSION}`, healthRouter)
app.use(`${ROUTE_VERSION}/user`, authRouter)

export default app;