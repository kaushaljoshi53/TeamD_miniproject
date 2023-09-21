import axios from "axios";
import projectsData from "../models/ProjectsData";
import { mapProjectsToProjectsData } from "../models/ProjectsData";

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

        try {

            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get("http://localhost:8080/api/getprojects", { headers: { Authorization: token } });
                if (response.status === 200) {
                    const data = response.data.projectsData;
                    if (data.length>0) {
                        const projects: projectsData[] = mapProjectsToProjectsData(data);
                        console.log(projects);
                        return projects
                    }
                    return [];
                }
                if (response.status === 203) {
                    return "Not Logged In"
                }
            }
        }
        catch (error) {

        }
    }
}



export const projectApi = new ProjectApis();