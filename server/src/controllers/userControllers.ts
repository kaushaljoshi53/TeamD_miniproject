import { signUpBackend } from '../utils/userDataValidation';
import { Response, Request } from "express";
import User from "../models/userData";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config()

class controllers {

    public static hasNullValues(data: any): boolean {

        // console.log("hassNullValues: ",data);

        for (const key in data) {
            if (data[key] === null) {
                return true;
            }
            else if (data[key] === null) {
                if (this.hasNullValues(data[key])) {
                    return true
                }
            }
        }
        return false
    }
    public static async userExistsEmail(email: string): Promise<boolean> {
        // console.log("userExists: ",email);

        try {
            const emailExists = await User.findOne({ where: { email: email } })
            return !!emailExists
        } catch (error) {
            console.error("error is checking email exists: ", error);
            throw error
        }
    }
    public static async userExistsEmployeeId(employeeId: string): Promise<boolean> {
        try {
            const employeeIdExists = await User.findOne({ where: { employeeId: employeeId } })
            return !!employeeIdExists
        } catch (error) {
            console.error("error is checking email exists: ", error);
            throw error
        }
    }
    public async signup(req: Request, res: Response) {


        try {
            const data = req.body;
            if (controllers.hasNullValues(data)) {
                res.status(400).json({ message: "Bad request! Has some null values." });
            }
            else {
                const emailValid = signUpBackend.validateEmail(data.email);
                if (!emailValid.result) {
                    res.status(400).json({ message: emailValid.message });
                } else {
                    const employeeIdValid = signUpBackend.validateEmployeeID(data.employeeId);
                    if (!employeeIdValid.result) {
                        res.status(400).json({ message: employeeIdValid.message });
                    } else {
                        const passwordValid = signUpBackend.validatePassword(data.password);
                        if (!passwordValid.result) {
                            res.status(400).json({ message: passwordValid.message });
                        } else {
                            const firstNameValid = signUpBackend.validateName(data.firstName);
                            const lastNameValid = signUpBackend.validateName(data.lastName);
                            if (!firstNameValid.result || !lastNameValid.result) {
                                res.status(400).json({ message: "Invalid Name" })
                            } else {
                                const emailCheck = await controllers.userExistsEmail(data.email);
                                const employeeIdCheck = await controllers.userExistsEmployeeId(data.employeeId);
                                if (emailCheck && employeeIdCheck) {
                                    res.status(200).json({ message: "User with email and empId already exists." });
                                }
                                else if (emailCheck) {
                                    res.status(200).json({ message: "User with email already exists." });
                                }
                                else if (employeeIdCheck) {
                                    res.status(200).json({ message: "User with empId already exists" });
                                }
                                else {

                                    const saltrounds = 10;
                                    bcrypt.hash(data.password, saltrounds, async (err, hash) => {
                                        if (err) {
                                            console.error(err);
                                            res.status(500).json({ message: "error hashing password" })
                                            return;
                                        }
                                        data.password = hash;
                                        data.employeeId = "JMD"+data.employeeId;
                                        const create = await User.create(data);
                                        if (create) {
                                            res.status(201).json({ message: "User registered successfully." });
                                        }
                                        else {
                                            res.status(500).json({ message: "User registration failed." });
                                        }
                                    })



                                }
                            }
                        }

                    }


                }
            }

        } catch (error) {
            console.error("Error in user registration: ", error);
            res.status(500).json({ message: "Internal Server Error" });
        }

    }


}


const controllers_obj = new controllers();

export default controllers_obj;