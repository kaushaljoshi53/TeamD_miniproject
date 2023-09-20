import { DataTypes, Model } from 'sequelize';
import { sequelizeObj } from '../database/dbConnect';

// Define the User model that extends from Sequelize's Model class
class Projects extends Model {
    public projectName!: string;
    public projectManager!: string;
    public approver!: string;
    public allocationStartDate!: Date;
    public allocationEndDate!: Date;
    public projectStartDate!: Date;
    public projectEndDate!: Date;
    public projectStatus!: string;
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
            defaultValue: "upcoming",
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
