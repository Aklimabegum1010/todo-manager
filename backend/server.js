import {app} from "./src/app.js";
import {connectdb} from "./src/config/db.js";

import dns from "node:dns/promises"
import {env} from "./src/config/env.js";
import {logger} from "./src/utils/logger.js";
import mongoose from "mongoose";
dns.setServers(["1.1.1.1"])


const port = env.PORT || 3000
const startServer = async () => {

    await connectdb()
     app.listen(port, () => {

        logger.info(`server is running on port ${port}`);
        logger.info(`API: http://localhost: ${port}/api/v1`);
        // console.log(`server is running on port ${port}`);
    })

let isShuttingDown = false
    const shutdown = async signal => {
        if (isShuttingDown) return
        isShuttingDown = true
        logger.info(`${signal} received shutting down gracefully`)

        const  forceTimer = setTimeout(() => {
            logger.error('forced shutdown after timeout')
            process.exit(1)
        }, 10_000)
        forceTimer.unref()

        server.close(async () => {
            try {
              logger.info('http server closed')
                await mongoose.connection.close()
                logger.info('mongodb connection closed')
                process.exit(0)
            } catch (err) {
                logger.error({err}, 'error during shutdown claenup')
                process.exit(1)
            }
        })

    }

    process.on('SIGTERM', () => shutdown('SIGTERM'))
    process.on('SIGINT', () => shutdown('SIGINT'))
    process.on('unhandledRejection', reason => {
        logger.error({err: reason}, 'unhandled rejection')
        shutdown('unhandledRejection')
    })


    process.on('uncaughtException', err => {
        logger.fatal({err}, 'uncaught exception')
        shutdown('uncaughtException')
    })


}
try {
    await startServer()
} catch (error) {
    console.error('failed to start server', error)

}