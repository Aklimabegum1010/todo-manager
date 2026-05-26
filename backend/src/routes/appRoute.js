import { Router } from "express";

export const appRouter = Router()
appRouter.get('/' , (_ , res)=>{
    res.send('app is running in server')
})