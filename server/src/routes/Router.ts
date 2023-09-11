// import { Router } from "express";
const Router = require("express")

import { controller } from "../controllers/Controllers";

const router = new Router();

router.post('/signup',controller.signup)



export default router;