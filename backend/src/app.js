import express from 'express'
import {appRouter} from "./routes/appRoute.js";



export const app = express()

app.use(express.json({limit: '16kb'}))
app.use('/api/v1', appRouter)