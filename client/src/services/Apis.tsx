import userData from "../models/UserData";
import axios from "axios";
import { BirthdayPerson } from "../components/Birthdays";
import eventsData from "../models/EventsData";

class Apis {

    async signup(data: userData): Promise<string> {

        console.log(data);


        try {
            const response = await axios.post("http://localhost:8080/api/signup", data);
            if (response.status === 201) {
                return "User registered successfully";
            }
            return "Something went wrong."
        } catch (error: any) {
            console.error("Error in signup: ", error.response.data.message);
            return error.response.data.message;
        }

    }

    async signin(email: string, password: string): Promise<any> {

        const response: any = await axios.post("http://localhost:8080/api/signin", { email: email, password: password });

        try {
            if (response.status === 201) {

                localStorage.setItem('token', response.data.token);
                
                console.log(response);
                

                return response.data.message;
            }
            else {
                return response.data.message;
            }
        } catch (error: any) {
            console.error(error);
        }
    }





    async getBirthdayPerson(): Promise<any> {
        const person: BirthdayPerson[] = [{
            name: "Kaushal Joshi",
            designation: "Software Engineer",
            imageUrl: "aa"
        }, {
            name: "Ankit Kumar Mishra",
            designation: "Software Engineer",
            imageUrl: "aa"
        }, {
            name: "Narendra Godara",
            designation: "Software Engineer",
            imageUrl: "aa"
        }, {
            name: "Purvaja Vasistha",
            designation: "Software Engineer",
            imageUrl: "aa"
        }, {
            name: "Himanshu Soni",
            designation: "Software Engineer",
            imageUrl: "aa"
        }]
        try {
            // const response = await axios.get("http://localhost:8080/api/getbirthdaydata");
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