import mongoose from "mongoose";
import config from "./config";
import app from "./app";


async function server() {
    try {
        await mongoose.connect(config.DB as string)
        console.log("Connected to MongoDB successfully!");
        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port as unknown as number}`)
        })
    } catch (error) {
        console.log(error)
    }
}
server()