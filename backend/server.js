import {app} from "./src/app.js";
import {connectdb} from "./src/config/db.js";

import dns from "node:dns/promises"
import {env} from "./src/config/env.js";
import {logger} from "./src/utils/logger.js";
dns.setServers(["1.1.1.1"])


const port = env.PORT || 3000
const startServer = async () => {

    await connectdb()
     app.listen(port, () => {

        logger.info(`server is running on port ${port}`);
        logger.info(`API: http://localhost: ${port}/api/v1`);
        // console.log(`server is running on port ${port}`);
    })

// let isShuttingDown = false
//     const shutdown = async signal => {
//         if (isShuttingDown) return
//         isShuttingDown = true
//         logger.info(`${signal} received shutting down gracefully`)
//
//         const  forceTimer = setTimeout(() => {
//             logger.error('forced shutdown after timeout')
//             process.exit(1)
//         }, 10_000)
//         forceTimer.unref()
//     }

}
try {
    await startServer()
} catch (error) {
    console.error('failed to start server', error)

}