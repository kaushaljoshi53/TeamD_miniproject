import { Request, Response } from 'express';
import hasNullValues from '../utils/hasNullValues';
import projectValidation from '../utils/projectValidation';
import Projects from '../models/projects';


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
            data.resource.forEach(async (element: { name: any; approver: any; allocationStartDate: any; allocationEndDate: any; }) => {

                const rows = {
                    projectName:data.projectName,
                    projectManager:data.projectManager,
                    projectStartDate:data.projectStartDate,
                    projectEndDate:data.projectEndDate,
                    projectStatus:data.projectStatus,
                    resource:element.name,
                    approver:element.approver,
                    allocationStartDate:element.allocationStartDate,
                    allocationEndDate:element.allocationEndDate,
                }
                const create = await Projects.create(rows);
                if (! create){
                    res.status(209).json({message:"Error Creating Table"});
                }
            });

        }
        catch (error) {
            console.error(error);
            
        }
    }

}


export default ProjectController;