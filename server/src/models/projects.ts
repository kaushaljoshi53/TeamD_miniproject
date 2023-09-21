import { DataTypes, Model } from 'sequelize';
import { sequelizeObj } from '../database/dbConnect';

// Define the User model that extends from Sequelize's Model class
class Projects extends Model {
    public projectName!: string;
    public projectStartDate!: Date;
    public allocationEndDate!: Date;
    public projectManager!: string;
    public projectStatus!: string;
    public resource!: string;
    public approver!: string;
    public allocationStartDate!: Date;
    public projectEndDate!: Date;
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
            type: DataTypes.DATE,
        },
        allocationEndDate: {
            type: DataTypes.DATE,
        },
        projectStartDate: {
            type: DataTypes.DATE,
        },
        projectEndDate: {
            type: DataTypes.DATE,
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
