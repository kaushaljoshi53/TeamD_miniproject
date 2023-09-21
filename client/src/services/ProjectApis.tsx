import axios from "axios";

class ProjectApis {


    async addProject(data: any): Promise<any> {
        try {

            const response = await axios.post("http://localhost:8080/api/addprojects", data);
            if (response.status === 201) {
                return "Project Added Successfully";
            }
            else {
                return response.data.message;
            }
        } catch (error: any) {
            console.error(error);
            return error
        }
    }

    async getProjects(): Promise<any> {
        console.log("here");
        
        try {

            const token = localStorage.getItem('token');
            
            if (token) {
                const response = await axios.get("http://localhost:8080/api/getprojects", { headers: { Authorization: token } });
                if (response.status === 200){    
                    return response.data.projectsData
                }
                if (response.status === 203){
                    return "Not Logged In"
                }
            }
        }
        catch (error) {

        }
    }
}



export const projectApi = new ProjectApis();