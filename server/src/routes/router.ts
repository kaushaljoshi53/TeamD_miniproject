import { Router } from 'express';
import UserController from '../controllers/userControllers';

// Create an Express router instance
const router = Router();

// Creating an object of UserController class
const userController = new UserController();

// Define a POST route for user signup and associate it with the signup method from controllers
router.post('/api/signup', userController.signup);
router.post('/api/signin', userController.signin);
router.post('/api/signout', (req,res)=>{
    // Clear the JWT cookie by setting its expiration to the past
res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'strict' }).status(200).json({ message: "Logged Out Successfully" });
})

export default router;
