import { Response, Request } from "express";
import User from "../models/userData";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config()

class controllers{

    public static hasNullValues(data:any):boolean{
        console.log("asdsad",data);
        
        for (const key in data){
            if (data[key] === null){
                return true;
            }
            else if (data[key] === null){
                if (this.hasNullValues(data[key])){
                    return true
                }
            }
        }
        return false
    }

    public static async userExists(email:string, employeeId:string):Promise<{email:boolean,employeeId:boolean}>{

        try {
            const emailExists = await User.findOne({where:{email:email}});
            const employeeIdExist = await User.findOne({where:{employeeId:employeeId}});

            return {email:!!emailExists, employeeId:!!employeeIdExist}


        } catch (error) {
            console.error("Error in getting user data: ",error);
            throw error
        }
    }

    public  async signup(req:Request, res:Response){

        
        try {
            const data = req.body;
            
            if (controllers.hasNullValues(data)) {
                res.status(400).json({message:"Bad request! Has some null values."});
            }
            else {
                const user_check = await controllers.userExists(data.email,data.employeeId);
                if (user_check.email && user_check.employeeId){
                    res.status(409).json({message:"User with email and empId already exists."});
                }
                else if (user_check.email){
                    res.status(409).json({message:"User with email already exists."});
                }
                else if (user_check.employeeId){
                    res.status(409).json({message:"User with empId already exists"});
                }
                else{

                    const saltrounds = 10;
                    bcrypt.hash(data.password,saltrounds,(err, hash)=>{
                        if (err) {
                            console.error(err);
                            res.status(500).json({message:"error hashing password"})
                            return;
                        }
                        data.password = hash;
                    })
                    

                    const create = await User.create(data);
                    if (create){
                        res.status(201).json({message:"User registered successfully."});
                    }
                    else{
                        res.status(500).json({message:"User registration failed."});
                    }
                    
                }
            }
                        
        } catch (error) {
            console.error("Error in user registration: ",error);
            res.status(500).json({message:"Internal Server Error"});
        }

    }


}


const controllers_obj = new controllers();

export default controllers_obj;