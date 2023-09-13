import { Router } from "express";
import controllers_obj from "../controllers/userControllers";


const router = Router();

router.post('/signup', controllers_obj.signup);

export default router;