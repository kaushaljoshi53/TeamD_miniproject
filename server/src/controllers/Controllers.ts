class Controllers{

    signup(req:Request, res:Response){
        console.log(req.body);
        
    }
}

export const controller = new Controllers()