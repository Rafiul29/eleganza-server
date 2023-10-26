import express,{Router} from "express";
import AuthMiddleware from "../middlewares/auth.middlewares";
import { UserController } from "../controllers/user.controllers";

const userRouter:Router=express.Router();

const authInstance=new AuthMiddleware();
const userInstance=new UserController();

//get an user
userRouter.get("/:uid",authInstance.isAuthenticated,userInstance.getAnUser);

// delete an user
userRouter.delete("/:uid",authInstance.isAuthenticated,userInstance.deleteAnUser);

// update and user
userRouter.put("/:uid",authInstance.isAuthenticated,userInstance.updateAnUser)

// get all users
userRouter.get("/",authInstance.isAuthenticated,authInstance.isAdmin,userInstance.getAllAnUsers)

export default userRouter;
