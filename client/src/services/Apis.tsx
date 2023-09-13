import { userdata } from "../models/Userdata";
import axios from "axios";

class Apis{

    async signup(data:userdata):Promise<string>{
 
        console.log(data);
        

        try {
            const response = await axios.post("http://localhost:8080/signup",data);
            if (response.status === 400) {
                return "Null values not accepted";
            }
            if (response.status === 200){
                return response.data.message;
            }
            if (response.status === 201){
                return "User registered successfully";
            }
            if (response.status === 500) {
                return "Internal server error"
            }
            return "Something went wrong."

        } catch (error) {
            console.error("Error in signup: ",error);
            return "Server error"
        }
        
        
        

    }
}

export const api = new Apis();