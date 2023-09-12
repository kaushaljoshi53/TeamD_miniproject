import  dotenv  from 'dotenv';
import Express from "express";
import cors from 'cors';
import http from 'http';

const app = Express();
app.use(cors());
app.use(Express.json())
const httpServer = http.createServer(app)

dotenv.config()
const PORT = process.env.PORT || 8080;


httpServer.listen(PORT,()=>{
    console.log(`Server running on port - ${PORT}`);
})

