import  dotenv  from 'dotenv';
import Express from "express";
import cors from 'cors';
import http from 'http';
import router from './routes/router';
import { dbConnect } from './database/dbConnect';


const app = Express();
app.use(cors());
app.use(Express.json())
app.use(router)
const httpServer = http.createServer(app)



dotenv.config()


const PORT = process.env.PORT || 8080;
httpServer.listen(PORT,()=>{
    console.log(`Server running on port - ${PORT}`);
})

dbConnect()

