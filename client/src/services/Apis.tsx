import { userdata } from "../models/Userdata";
import axios from "axios";
import { BirthdayPerson } from "../components/Birthdays";
class Apis {

    async signup(data: userdata): Promise<string> {

        console.log(data);


        try {
            const response = await axios.post("http://localhost:8080/signup", data);
            if (response.status === 201) {
                return "User registered successfully";
            }
            return "Something went wrong."
        } catch (error:any) {
            console.error("Error in signup: ", error.response.data.message);
            return error.response.data.message
        }

    }

    async signin(email:string,password:string): Promise<any> {
        const response = await axios.post("http://localhost:8080/signin", {email:email, passowrd:password});
        try {
            if (response.status === 201){
                return "Logged In Successfully";
            }
            else{
                return "Invalid Credentials";
            }
        } catch (error) {
            throw error;
        }
    }



    async getBirthdayPerson(): Promise<BirthdayPerson[]> {
        const person: BirthdayPerson[] = [{
            name: "Kaushal Joshi",
            designation: "Software Engineer",
            imageUrl: "aa"
        }, {
            name: "Ankit Kumar Mishra",
            designation: "Software Engineer",
            imageUrl: "aa"
        },{
            name: "Narendra Godara",
            designation: "Software Engineer",
            imageUrl: "aa"
        },{
            name: "Purvaja Vasistha",
            designation: "Software Engineer",
            imageUrl: "aa"
        },{
            name: "Himanshu Soni",
            designation: "Software Engineer",
            imageUrl: "aa"
        }]
        try {
            // const response = await axios.get("http://localhost:8080/getbirthdaydata");
            // if (response.status === 200) {
            //     return response.data.birthdayData;
            // }
            return person
        } catch (error) {
            throw error;
        }
    }
}

export const api = new Apis();