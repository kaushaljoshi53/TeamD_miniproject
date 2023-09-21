import axios from "axios";
import eventsData from "../models/EventsData";

class EventApis {

    
    async addEvent(data: eventsData): Promise<any> {
        console.log(data);
        try {
            
            const response = await axios.post("http://localhost:8080/api/addevents", data);
            if (response.status === 201){
                return "Event Added Successfully";
            }
            else {
                return response.data.message;
            }
        } catch (error:any) {
            console.error(error);
            return error
        }
    }
}



export const eventApi = new EventApis();