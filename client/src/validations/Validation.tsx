import { Apis } from "../services/Apis";
import { userdata } from "../models/Userdata";




export class Validations{

    Signup(data:userdata){

        if(data.email === ''||
            data.empid === ''||
            data.fname === ''||
            data.lname === ''||
            data.password === ''||
            data.repassword === ''){

                return ("Enter all the neccesary fields");
            }
        else if(data.password !== data.repassword){
            return("Passwords must match")
        }
        else{

        }
    }

}