import express from 'express'
import healthRouter from './modules/healthCheck/health.routes.js';
import authRouter from './modules/auth/auth.routes.js'
import { ROUTE_VERSION } from './constants.js';

const app = express() 

app.use(express.json())

app.use(`${ROUTE_VERSION}`, healthRouter)
app.use(`${ROUTE_VERSION}/user`, authRouter)

export default app;