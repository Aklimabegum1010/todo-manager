import {app} from "./src/app.js";

const port = process.env.port
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})