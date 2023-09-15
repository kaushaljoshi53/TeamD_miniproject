import { Router } from 'express';
import UserController from '../controllers/userControllers';

// Create an Express router instance
const router = Router();

// Creating an object of UserController class
const userController = new UserController();

// Define a POST route for user signup and associate it with the signup method from controllers
router.post('/signup', userController.signup);

export default router;
