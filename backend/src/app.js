import express from 'express'
import {router} from './routes/index.js';
import {errorHandler} from './middlewares/errorHandler.js';

export const app = express()

app.use(express.json({limit: '16kb'}))

app.use('/api/v1', router)

app.use(errorHandler)