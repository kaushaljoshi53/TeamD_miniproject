import { Router } from 'express';
import UserController from '../controllers/userControllers';

// Create an Express router instance
const userRouter = Router();

// Creating an object of UserController class
const userController = new UserController();

// Define a POST route for user signup and associate it with the signup method from controllers
userRouter.post('/api/signup', userController.signup);
userRouter.post('/api/signin', userController.signin);


export default userRouter;
