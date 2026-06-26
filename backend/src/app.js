import express from 'express'
import {router} from './routes/index.js';
import {errorHandler} from './middlewares/errorHandler.js';
import {errorMiddleware} from "./middlewares/errorMiddleware.js";

export const app = express()

app.use(express.json({limit: '16kb'}))

app.use('/api/v1', router)

// app.use(errorHandler)
app.use(errorMiddleware)