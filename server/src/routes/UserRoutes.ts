import { Router } from "express";
import { Controller } from "../controllers/UserController";


const Route = Router()

Route.post('/signup',Controller.signin)