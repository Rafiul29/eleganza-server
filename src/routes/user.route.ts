import express,{Router} from "express";

const userRouter:Router=express.Router();

// get all users
userRouter.get("/")

//get an user
userRouter.get("/:uid");

// delete an user
userRouter.delete("/:uid");

// update and user
userRouter.put("/:id")


export default userRouter;
