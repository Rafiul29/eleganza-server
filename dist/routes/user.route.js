"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middlewares_1 = __importDefault(require("../middlewares/auth.middlewares"));
const user_controllers_1 = require("../controllers/user.controllers");
const userRouter = express_1.default.Router();
const authInstance = new auth_middlewares_1.default();
const userInstance = new user_controllers_1.UserController();
//get an user
userRouter.get("/:uid", authInstance.isAuthenticated, userInstance.getAnUser);
// delete an user
userRouter.delete("/:uid", authInstance.isAuthenticated, userInstance.deleteAnUser);
// update and user
userRouter.put("/:uid", authInstance.isAuthenticated, userInstance.updateAnUser);
// get all users
userRouter.get("/", authInstance.isAuthenticated, authInstance.isAdmin, userInstance.getAllAnUsers);
exports.default = userRouter;
