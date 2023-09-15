import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { signUpBackend } from '../utils/userDataValidation';
import User from '../models/userData';

class UserController {
  /**
   * Check if an object contains null values recursively.
   * @param {object} data - The object to check.
   * @returns {boolean} - True if there are null values, false otherwise.
   */
  private static hasNullValues(data: any): boolean {
    for (const key in data) {
      if (data[key] === null) {
        return true;
      } else if (typeof data[key] === 'object' && UserController.hasNullValues(data[key])) {
        return true;
      }
    }
    return false;
  }

  /**
   * Middleware function to handle user registration.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   */
  public async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      // Check for null values in the request data
      if (UserController.hasNullValues(data)) {
        return res.status(400).json({ message: 'Bad request! Has some null values.' });
      }

      // Validate email
      const emailValid = signUpBackend.validateEmail(data.email);
      if (!emailValid.result) {
        return res.status(400).json({ message: emailValid.message });
      }

      // Validate employee ID
      const employeeIdValid = signUpBackend.validateEmployeeID(data.employeeId);
      if (!employeeIdValid.result) {
        return res.status(400).json({ message: employeeIdValid.message });
      }

      // Validate password
      const passwordValid = signUpBackend.validatePassword(data.password);
      if (!passwordValid.result) {
        return res.status(400).json({ message: passwordValid.message });
      }

      // Validate first and last names
      const firstNameValid = signUpBackend.validateName(data.firstName);
      const lastNameValid = signUpBackend.validateName(data.lastName);
      if (!firstNameValid.result || !lastNameValid.result) {
        return res.status(400).json({ message: 'Invalid Name' });
      }

      // Check if email and employee ID already exist
      const emailExists = await User.findOne({ where: { email: data.email } });
      data.employeeId = 'JMD' + data.employeeId;
      const employeeIdExists = await User.findOne({ where: { employeeId: data.employeeId} });
      console.log("asadasdasd",employeeIdExists );
      
      if (!!emailExists && !!employeeIdExists) {
        return res.status(409).json({ message: 'User with email and empId already exists.' }); 
      } else if (!!emailExists) {
        return res.status(409).json({ message: 'User with email already exists.' });
      } else if (!!employeeIdExists) {
        return res.status(409).json({ message: 'User with empId already exists' });
      }

      // Hash the password and create the user
      const saltrounds = 10;
      bcrypt.hash(data.password, saltrounds, async (err, hash) => {
        if (err) {
          return res.status(500).json({ message: 'Error hashing password' });
        }

        data.password = hash;
        const create = await User.create(data);

        if (create) {
          return res.status(201).json({ message: 'User registered successfully.' });
        } else {
          return res.status(500).json({ message: 'User registration failed.' });
        }
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default UserController;
