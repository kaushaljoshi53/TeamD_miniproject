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
            allowNull: false,
        },
        projectManager: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        approver: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        resource: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        allocationStartDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        allocationEndDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        projectStartDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        projectEndDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        projectStatus: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        allocationStatus: {
            type: DataTypes.STRING,
            allowNull: false,
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
