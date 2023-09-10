import express from "express";
import http from "http";
import cors from "cors";

import { Controller } from "./controllers/UserController";


const app = express();
app.use(cors())

const httpServer = http.createServer(app)


const PORT = process.env.PORT || 8080
httpServer.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})