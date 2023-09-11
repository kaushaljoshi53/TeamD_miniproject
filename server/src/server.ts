import express from "express";
import http from "http";
import cors from "cors";
import { dbConnection } from "./database/dbConnection";
import router from "./routes/Router";


const app = express();
app.use(cors())
app.use(express.json());
app.use(router)





dbConnection.connect((err) => {
    if (err) {
        console.error("DB connection error", err);
        // Consider handling the error more gracefully (e.g., app shutdown).
    } else {
        console.log("DB connected successfully");
    }
});




const httpServer = http.createServer(app)

const PORT = process.env.PORT || 8080
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

httpServer


