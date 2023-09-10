import { error } from "console";

export function hasNullValues(obj:any):boolean{

    for (const key in obj){
        if(obj[key] === null){
            return true;
        }
    }
    return false;
}


export class Controller{


    signin(req:Request, res:Response){
        
        const userData = req.body
        
        if (hasNullValues(userData)) {
            res.status(400).json{{error: 'User data must not be null'}}
        }
    }

}