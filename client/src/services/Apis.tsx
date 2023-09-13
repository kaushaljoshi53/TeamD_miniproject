import { userdata } from "../models/Userdata";
import axios from "axios";

class Apis{

    async signup(data:userdata){
 

        try {
            const response = await axios.post("http://localhost:8080/signup",data);
            if (response.status === 400) {
                return "Null values not accepted";
            }
            if (response.status === 409){
                return "User already exists";
            }
            if (response.status === 201){
                return "User registered successfully";
            }
            if (response.status === 500) {
                return "Internal server error"
            }
            else{
                return "Something went wrong"
            }

        } catch (error) {
            console.error("Error in signup: ",error);
            return error
        }
        
        
        

    }
}

export const api = new Apis();