import {app} from "./src/app.js";
import {connectdb} from "./src/config/db.js";

import dns from "node:dns/promises"
dns.setServers(["1.1.1.1"])


const port = process.env.port

connectdb();
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})