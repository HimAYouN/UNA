import express from 'express'
import healthRouter from './modules/healthCheck/health.routes.js';

const app = express() 

app.use('/api/v1', healthRouter)

export default app;