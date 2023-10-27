import express,{Router} from "express";
import AuthMiddleware from "../middlewares/auth.middlewares";
import BeautyPackageController from "../controllers/beautypackage.controller";


const beautyPackageRouter:Router=express.Router();

const authInstance=new AuthMiddleware();

const beautyPackageInstance=new BeautyPackageController()



// get all beauty packages
beautyPackageRouter.get("/",beautyPackageInstance.getAllBeautyPackages);

//get a beauty packages
beautyPackageRouter.get("/:bid",beautyPackageInstance.getBeautyPackage);

// create a beauty package
beautyPackageRouter.post("/",authInstance.isAuthenticated,authInstance.isAdmin,beautyPackageInstance.createBeautyPackage);

//update a beauty package
beautyPackageRouter.put("/:bid",authInstance.isAuthenticated,authInstance.isAdmin,beautyPackageInstance.updateBeautyPackage);

// delete a beauty package
beautyPackageRouter.delete("/:bid",authInstance.isAuthenticated,authInstance.isAdmin,beautyPackageInstance.deleteBeautyPackage);

export default beautyPackageRouter;