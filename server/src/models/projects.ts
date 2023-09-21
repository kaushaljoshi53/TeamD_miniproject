import { DataTypes, Model } from 'sequelize';
import { sequelizeObj } from '../database/dbConnect';

// Define the User model that extends from Sequelize's Model class
class Projects extends Model {
    public projectName!: string;
    public projectStartDate!: string;
    public allocationEndDate!: string;
    public projectManager!: string;
    public projectStatus!: string;
    public resource!: string;
    public approver!: string;
    public allocationStartDate!: string;
    public projectEndDate!: string;
    public allocationStatus!:string;
    public softDeleted!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the User model with its attributes and configuration
Projects.init(
    {
        projectName: {
            type: DataTypes.STRING,
        },
        projectManager: {
            type: DataTypes.STRING,
        },
        approver: {
            type: DataTypes.STRING,
        },
        resource: {
            type: DataTypes.STRING,
        },
        allocationStartDate: {
            type: DataTypes.STRING,
        },
        allocationEndDate: {
            type: DataTypes.STRING,
        },
        projectStartDate: {
            type: DataTypes.STRING,
        },
        projectEndDate: {
            type: DataTypes.STRING,
        },
        projectStatus: {
            type: DataTypes.STRING,
        },
        allocationStatus: {
            type: DataTypes.STRING,
        },
        softDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue:false,
        }
    },
    {
        sequelize: sequelizeObj,
        modelName: 'Project',
    }
);

export default Projects;
