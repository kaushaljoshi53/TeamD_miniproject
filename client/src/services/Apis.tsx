import { userdata } from "../models/Userdata";
import axios from "axios";

class Apis{

    async signup(data:userdata){

        console.log(data);
        

        const response = await axios.post("http://localhost:8080/signup",data)
        console.log(response);
        
        

    }
}

export const api = new Apis();