

interface resources {
    name: string;
    allocationStartDate: string;
    allocationEndDate: string;
    allocationStatus: string;
}

export default interface projectsData {
    projectName: string;
    projectManager: string;
    projectStartDate: string;
    projectEndDate: string;
    projectStatus: string;
    resources: resources[],
}

// interface projectData {
//     projectName: string;
//     projectStartDate: string;
//     allocationEndDate: string;
//     projectManager: string;
//     projectStatus: string;
//     resource: string;
//     approver: string;
//     allocationStartDate: string;
//     projectEndDate: string;
//     allocationStatus: string;
// }

export function mapProjectsToProjectsData(projects: any[]): projectsData[] {

    // console.log(projects.length);
    const project: projectsData[] = [];
    project.push()

    for (var i = 0; i < projects.length; i++) {
        const foundProject = project.findIndex((proj) => proj.projectName === projects[i].projectName);

        if (foundProject !== -1) {
            project[foundProject].resources.push({
                name: projects[i].resource, allocationStartDate: projects[i].allocationStartDate,
                allocationEndDate: projects[i].allocationStartDate, allocationStatus: projects[i].allocationStatus
            })
        }
        else {

            const resource = [{
                name: projects[i].resource, allocationStartDate: projects[i].allocationStartDate,
                allocationEndDate: projects[i].allocationStartDate, allocationStatus: projects[i].allocationStatus
            }]
            project.push({
                projectName: projects[i].projectName,
                projectManager: projects[i].projectManager,
                projectStatus: projects[i].projectStatus,
                projectStartDate: projects[i].projectStartDate,
                projectEndDate: projects[i].projectEndDate,
                resources: resource,
            })

        }

    }
    return project;
}