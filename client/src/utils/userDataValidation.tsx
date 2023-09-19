import { api } from "../services/Apis";
import { userdata } from "../models/Userdata";
import { signUpRealTime } from "./realTimeValidation";

export class userDataValidations {

  static async signup(data: userdata, rePassword: string): Promise<string> {

    if (data.email === '' ||
      data.employeeId === '' ||
      data.firstName === '' ||
      data.lastName === '' ||
      data.password === '' ||
      rePassword === '') {

      return ("Enter all the neccesary fields");
    } else {
      const validateEmail = signUpRealTime.validateEmail(data.email);
      if (validateEmail !== "") {
        return "Enter Valid Email";
      } else {
        const validateEmployeeID = signUpRealTime.validateEmployeeID(data.employeeId);
        if (validateEmployeeID !== "") {
          return "Enter Valid Employee ID";
        } else {
          const validatePassword = signUpRealTime.validatePassword(data.password);
          if (validatePassword !== "") {
            return "Enter Valid Password";
          } else {
            const validateRepassword = signUpRealTime.validateRepassword(data.password, rePassword);
            if (validateRepassword !== "") {
              return "Passwords Must Match";
            } else {
              const validateFirstName = signUpRealTime.validateName(data.firstName);
              const validateLastName = signUpRealTime.validateName(data.lastName);
              if (validateFirstName !== "" || validateLastName !== "") {
                return "Enter Name Correctly";
              }
            }
          }
        }
      }
      const message = await api.signup(data);
      return message;
    }
  }


  static async signin(email:string, password:string): Promise<any>{
    
    if (email === '' || password === ''){
      return "Fill The Credentials"
    }
    const message = await api.signin(email,password);
    
    return message;

    

  }
}