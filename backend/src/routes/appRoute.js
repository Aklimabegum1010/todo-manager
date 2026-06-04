import {Router} from 'express';

export const appRoutes = Router()

appRoutes.get('/', (_, res) => {
    res.send('app is running in server')
})