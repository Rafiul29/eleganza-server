"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middlewares_1 = __importDefault(require("../middlewares/auth.middlewares"));
const beautypackage_controller_1 = __importDefault(require("../controllers/beautypackage.controller"));
const beautyPackageRouter = express_1.default.Router();
const authInstance = new auth_middlewares_1.default();
const beautyPackageInstance = new beautypackage_controller_1.default();
// get all beauty packages
beautyPackageRouter.get("/", beautyPackageInstance.getAllBeautyPackages);
//get a beauty packages
beautyPackageRouter.get("/:bid", beautyPackageInstance.getBeautyPackage);
// create a beauty package
beautyPackageRouter.post("/", authInstance.isAuthenticated, authInstance.isAdmin, beautyPackageInstance.createBeautyPackage);
//update a beauty package
beautyPackageRouter.put("/:bid", authInstance.isAuthenticated, authInstance.isAdmin, beautyPackageInstance.updateBeautyPackage);
// delete a beauty package
beautyPackageRouter.delete("/:bid", authInstance.isAuthenticated, authInstance.isAdmin, beautyPackageInstance.deleteBeautyPackage);
exports.default = beautyPackageRouter;
