import express from "express"
import {getUser, login, logout, register, updatePassword, updateUser} from "../controllers/userController.js"
import { isAuthenticated } from "../middleware/auth.js";

const router =express.Router();

router.post("/register",register);

router.post("/login",login);

router.get("/logout",isAuthenticated,logout);

router.get("/get",isAuthenticated,getUser);

router.put("/update/profile",isAuthenticated,updateUser)

router.put("/update/password",isAuthenticated,updatePassword)


export default router 