import { api } from "../services/Apis";
import userData from "../models/UserData";
import { signUpRealTime } from "./realTimeValidation";
import eventsData from "../models/EventsData"
import { eventApi } from "../services/EventApis";
import { projectApi } from "../services/ProjectApis";

export class userDataValidations {

  static async signup(data: userData, rePassword: string): Promise<string> {

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


  static async signin(email: string, password: string): Promise<any> {

    if (email === '' || password === '') {
      return "Fill The Credentials"
    }
    const message = await api.signin(email, password);

    return message;



  }
}


export class eventsDataValidations {

  static async addEvent(data: eventsData): Promise<string> {


    if (data.eventName === '' ||
      data.endTime === '' ||
      data.eventDate === '' ||
      data.startTime === '' ||
      data.eventVenue === '') {
      return "Fill all the fields";
    }
    const response = await eventApi.addEvent(data);
    return response;
  }
}



export class projectValidations {

  static async addProject(data: any) :Promise<string>{
    // Destructure the data object to get individual field values
    const {
      projectName,
      projectManager,
      projectStartDate,
      projectEndDate,
      projectStatus,
      resources,
    } = data;

    // Check if any of the main fields are empty
    if (
      projectName.trim() === '' ||
      projectManager.trim() === '' ||
      projectStartDate.trim() === '' ||
      projectEndDate.trim() === '' ||
      projectStatus.trim() === ''
    ) {
      return "All Fields Must Be Filled";
    }

    // Check if any resource fields are empty
    for (const resource of resources) {
      if (
        resource.name.trim() === '' ||
        resource.approverName.trim() === '' ||
        resource.allocationStartDate.trim() === '' ||
        resource.allocationEndDate.trim() === '' ||
        resource.allocationStatus.trim() === ''
      ) {
        return "All Fields Must Be Filled";
      }
    }
    log
    const message = await projectApi.addProject(data);
    return message;
  }

}