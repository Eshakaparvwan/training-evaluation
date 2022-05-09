import express from "express";

import { connectToMongo } from "./connections/mongo.connection";
import { registerRoutes } from "./routes/index";

export const startServer = async () => {
    try {
        const app = express();

        await connectToMongo();
        registerRoutes(app);

        const { PORT } = process.env;
        app.listen(
            PORT,
            () => console.log(`SERVER STARTED ON PORT: ${PORT}`)
        );
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}