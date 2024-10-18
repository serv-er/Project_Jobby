import jwt from "jsonwebtoken";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import { User } from "../models/userSchema.js";

export const isAuthenticated=catchAsyncErrors(async(req,res,next)=>{
    const {token}=req.cookies
    if(!token){
        return next(new ErrorHandler("User is not authenticated"))
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET_kEY)
    req.user=await User.findById(decoded.id)
    
    next();
})

export const isAuthorized=(...role)=>{
    return (req,res,next)=>{
        if(!role.includes(req.user.role)){
            return next(new ErrorHandler(`Role:${req.user.role} is not allowed to access this resource`,403))
        }
        next();
    }
    
}