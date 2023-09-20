interface date{
    day: number;
    month: number;
    year: number;
}


interface projectResource{
    name: string;
    approver: string;
    allocationStartDate: date;
    allocationEndDate: date;
    allocationStatus: string;
}


export default interface projectsData{
    projectName: string;
    projectStartDate: date;
    projectEndDate: date;
    allocationStartDate: date;
    allocationEndDate: date;
    projectManager: string;
    approver: string;
    allocationStatus:string;
    projectStatus: string;
    resources: projectResource[];
}