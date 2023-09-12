import { DataTypes, Model } from "sequelize";
import { sequelizeObj } from "../database/dbConnect";

class User extends Model{

    public firstname!: string;
    public lastname!:string;
    public email!:string;
    public empId!:string;
    public designation!:string;
    public password!:string;
    public image!:Buffer|null;
    public isAdmin!:boolean;
    public softDeleted!:boolean;

    public readonly createdAt!:Date;
    public readonly updatedAt!:Date;

}

User.init(
    {
        firstname:{
            type:DataTypes.STRING,
            allowNull:false
        },
        lastname:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        empId:{
            type:DataTypes.STRING,
            allowNull:false
        },
        designation:{
            type:DataTypes.STRING,
            defaultValue:"Intern"
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        image:{
            type:DataTypes.BLOB('long'),
            allowNull:true
        },
        isAdmin:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        softDeleted:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }
    },
    {
        sequelize:sequelizeObj,
        modelName:'User'
    }
);


export default User;