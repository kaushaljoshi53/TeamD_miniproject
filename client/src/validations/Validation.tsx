import { api } from "../services/Apis";
import { userdata } from "../models/Userdata";




export class Validations{

    signup(data:userdata){

        
        
        api.signup(data)

        // if(data.email === ''||
        //     data.empid === ''||
        //     data.fname === ''||
        //     data.lname === ''||
        //     data.password === ''||
        //     data.repassword === ''){

        //         return ("Enter all the neccesary fields");
        //     }
        // else if(data.password !== data.repassword){
        //     return("Passwords must match")
        // }
        // else{

        // }
    }

}