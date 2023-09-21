import { Request, Response } from 'express';
import hasNullValues from '../utils/hasNullValues';
import projectValidation from '../utils/projectValidation';
import Projects from '../models/projects';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ifError } from 'assert';


dotenv.config();
class ProjectController {


    public async addProject(req: Request, res: Response) {
        try {
            const data = req.body;
            console.log(data);

            if (hasNullValues(data)) {
                return res.status(209).json({ message: "All Fields Should Be Filled." })
            }
            if ((!projectValidation.isValidDateFormat(data.projectStartDate)) || (!projectValidation.isValidDateFormat(data.projectEndDate))) {
                return res.status(209).json({ message: "Wrong Date Input" });
            }
            if (!projectValidation.isStartDateBeforeEndDate(data.projectStartDate, data.projectEndDate)) {
                return res.status(209).json({ message: "Start Date Must be Before End Date" });
            }
            data.resources.forEach((element: { allocationStartDate: any;allocationEndDate: any }) => {
                if ((!projectValidation.isValidDateFormat(element.allocationStartDate)) || (!projectValidation.isValidDateFormat(element.allocationEndDate))) {
                    return res.status(209).json({ message: "Wrong Date Input" });
                }
                if ((!projectValidation.isStartDateBeforeEndDate(data.projectStartDate,element.allocationStartDate))){
                    return res.status(209).json({message:"Allocation cant be before start date"});
                }
                if (!projectValidation.isStartDateBeforeEndDate(element.allocationStartDate, element.allocationEndDate)) {
                    return res.status(209).json({ message: "Start Date Must be Before End Date" });
                }
            });

            const projectExists = await Projects.findOne({where:{projectName:data.projectName}});
            if (!! projectExists) {
                return res.status(209).json({message: "Project Already Exists"});
            }
            for(let i=0;i<data.resources.length;i++){
            const element = data.resources[i]
                const rows = {
                    projectName:data.projectName,
                    projectManager:data.projectManager,
                    projectStartDate:data.projectStartDate,
                    projectEndDate:data.projectEndDate,
                    projectStatus:data.projectStatus,
                    resource:element.name,
                    approver:element.approverName,
                    allocationStartDate:element.allocationStartDate,
                    allocationEndDate:element.allocationEndDate,
                    allocationStatus:element.allocationStatus
                }
                await Projects.create(rows).then(()=>{
                    if(i==data.resources.length-1){
                        res.json({message:"created"})
                    }
                })
        }
        }
        catch (error) {
            console.error(error);
            
        }
    }

    private static async verifyToken(token:string){

        const key = process.env.JWT_KEY
        if(key){
            const decoded:any = await jwt.verify(token,key)
            console.log("decoded",decoded);
            
            if (decoded.user) {
                return decoded.user;
            }
            else{
                return false;
            }

        }
    }
    public async getProject(req:Request, res: Response) {
        
        const token:string|undefined = req.headers.authorization;
        console.log("token",token);
        

        if (token) {
            const verifiedUser:any = await ProjectController.verifyToken(token);
            if (verifiedUser) {
                if (verifiedUser.isAdmin){
                    const projectsData = await Projects.findAll();
                    
                    if (projectsData){
                        res.status(200).json({projectsData,isAdmin:true});
                    }
                    else {
                        res.status(209).json({message:"No Record Found",isAdmin:true});
                    }
                }
                else {
                    const projectsData = await Projects.findAll({where:{resource:verifiedUser.employeeId}});
                    if (projectsData){
                        res.status(200).json({projectsData,isAdmin:false});
                    }
                    else {
                        res.status(209).json({message:"No Record Found",isAdmin:false});
                    }
                }
            }

        }
        else {
            res.status(203).json({message:"Token Expired"});
        }

    }
}


export default ProjectController;