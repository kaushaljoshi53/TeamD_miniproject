import { Response, Request } from "express";
import User from "src/models/userData";



class controllers{

    public hasNullValues(data:any):boolean{
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

    public async userExists(email:string, empId:string):Promise<object>{

        try {
            const emailExists = await User.findOne({where:{email:email}});
            const empidExist = await User.findOne({where:{empId:empId}});

            return {email:!!emailExists, empId:!!empId}


        } catch (error) {
            console.error("Error in getting user data: ",error);
            throw error
        }
    }


    public async signup(req:Request, res:Response){
        try {
            const data:User = req.body;
            if (this.hasNullValues(data)) {
                res.status(400).json({message:"Bad request! Has some null values."})
            }
            else if(await this.userExists(data.email,data.empId)){
                
            }
            
        } catch (error) {
            
        }

    }

}