import express from "express";
import http from "http";
import cors from "cors";
import router from "./routes/Router";


const app = express();
app.use(cors())
app.use(express.json());
app.use(router)




const httpServer = http.createServer(app)

const PORT = process.env.PORT || 8080
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

httpServer


