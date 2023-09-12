import { DataTypes, Model } from "sequelize";
import sequelizeObj from "../database/dbConnection";
import { BlobOptions } from "buffer";


class User extends Model{
    public FirstName!:string;
    public LastName!:string;
    public Email!:string;
    public EmpID!:string;
    public Designation!:string;
    public Password!:string;
    public Image!:Buffer|null;
    public isAdmin!:boolean;
    public softDelete!:boolean;


    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}
User.init(
    {
        FirstName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        LastName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        Email:{
            type:DataTypes.STRING,
            allowNull:false,
            primaryKey:true
        },
        EmpID:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        Designation:{
            type:DataTypes.STRING,
            allowNull:false,
            defaultValue:"Intern"
        },
        Password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        Image:{
            type:DataTypes.BLOB('long'),
            allowNull:true
        },
        isAdmin:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        softDelete:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }
    },
    {
        sequelize:sequelizeObj,
        modelName:'User'
    }
);


sequelizeObj.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing the database:', error);
  });

export default User;