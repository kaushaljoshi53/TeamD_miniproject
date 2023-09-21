import axios from "axios";

class ProjectApis {

    
    async addProject(data: any): Promise<any> {
        try {
            
            const response = await axios.post("http://localhost:8080/api/addprojects", data);
            if (response.status === 201){
                return "Project Added Successfully";
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



export const projectApi = new ProjectApis();