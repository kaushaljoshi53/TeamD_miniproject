import { Router } from "express";
import EventController from "../controllers/eventControllers";


const eventRoutes = Router();

const eventController = new EventController();

eventRoutes.post('/api/addevents',eventController.addEvent);
// eventRoutes.post('/api/getprojects',eventController.getProject);

export default eventRoutes;