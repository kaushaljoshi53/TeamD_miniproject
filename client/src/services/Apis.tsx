import { userdata } from "../models/Userdata";
import axios from "axios";

export class Apis{

    async Signup(data:userdata){

        const response = await axios.post("http://localhost:8080/signup",data)
        

    }
}