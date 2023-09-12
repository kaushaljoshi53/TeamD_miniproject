import {Sequelize} from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelizeObj = new Sequelize({
    dialect:'mysql',
    host:process.env.DB_HOST,
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
});


export async function dbConnect(){
    try {
        await sequelizeObj.sync({force:false});
        console.log("Database synchronized successfully.");
        
    } catch (error) {
        console.error("Problem in suncrhronizing database.");
        
    }
}