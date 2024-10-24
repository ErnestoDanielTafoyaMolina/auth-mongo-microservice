import mongoose from "mongoose";
import config from "./config.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
        process.exit(1); // Salir en caso de error de conexión
    }
}

