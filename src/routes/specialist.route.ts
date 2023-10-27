import express,{ Router } from "express"
import AuthMiddleware from "../middlewares/auth.middlewares";
import SpecialistController from "../controllers/specialist.controller";

const specialistRouter:Router=express.Router();

const authInstance=new AuthMiddleware()
const specialistInstance=new SpecialistController();

// get all specialist
specialistRouter.get("/",specialistInstance.getAllSpecialist);

// get a specialist 
specialistRouter.get("/:sid",specialistInstance.getSpecialist);

// create a  specialist
specialistRouter.post("/",authInstance.isAuthenticated,authInstance.isAdmin,specialistInstance.createSpecialist);

// update a specialist
specialistRouter.put("/:sid",authInstance.isAuthenticated,authInstance.isAdmin,specialistInstance.updateSpecialist);

// delete a specialist
specialistRouter.delete("/:sid",authInstance.isAuthenticated,authInstance.isAdmin,specialistInstance.deleteSpecialist);

export default specialistRouter;