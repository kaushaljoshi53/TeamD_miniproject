import { Request, Response } from "express";
import { Op } from "sequelize";
import User from "src/models/user";
import { json } from "stream/consumers";


class UserControllers{

    hasNullValues(data: any): boolean {
        for (const key in data) {
          if (data.hasOwnProperty(key) && data[key] === null) {
            return true; // Found a null value
          }
        }
        return false; // No null values found
      }

    async userExists(Email: string, EmpID: string): Promise<boolean> {
        try {
            const existing = await User.findOne({
                where:{
                [Op.or]:[
                    { Email },
                    { EmpID },
                ]
            }
        });

        return !!existing

        } catch (error) {
            console.error("error in checking for esisting user: ",error);
            throw error

        }
      }

    async signup(req:Request, res:Response){
        try {
            const data = req.body;
            if (this.hasNullValues(data)) {
                res.status(400).json({message:"Bad Request!Has some null values"})
            }
            else if ( await this.userExists(data.email, data.empid)) {
                res.status(409).json({message:"User already exists"})
            }
            


        } catch (error) {
            
        }
        
    }
}

export const controller = new UserControllers()