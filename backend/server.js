import {app} from "./src/app.js";
import {connectdb} from "./src/config/db.js";

import dns from "node:dns/promises"
dns.setServers(["1.1.1.1"])


const port = process.env.PORT || 3000
const startServer = async () => {
    await connectdb()
    app.listen(port, () => {
        console.log(`server is running on port ${port}`);
    })
}
try {
    await startServer()
} catch (error) {
    console.error('failed to start server', error)

}