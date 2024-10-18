import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js"
import ErrorHandler from "../middleware/error.js"
import {User} from "../models/userSchema.js"
import {v2 as cloudinary} from "cloudinary"
import { sendToken } from "../utils/jwtToken.js"

export const register=catchAsyncErrors(async(req,res,next)=>{
    try{
        const {
            name,
            email,
            phone,
            address,
            password,
            role,
            firstNiches,
            secondNiches,
            thirdNiches,
            coverletter
             }=req.body
        if(!name || !email || !phone || !address || !password){
            return next(new ErrorHandler(" All fields are required ",400))
        }
        
        if(role==="jobSeeker"  && (!firstNiches || !secondNiches || !thirdNiches)){
            return next(new ErrorHandler(" Please provide your preferred niches ",400))
        }
    
        const existingUser = await User.findOne({email})
        if(existingUser){
            return next(new ErrorHandler("Email is already registered",400));
        }
    
        const userData={
            name,
            email,
            phone,
            address,
            password,
            role,
            niches:{
                firstNiches,
                secondNiches,
                thirdNiches
            },
            coverletter
        }
    
        if(req.files && req.files.resume){
            const {resume}=req.files
            if(resume){
                try{
                    const cloudinaryResponse=await cloudinary.uploader.upload(resume.tempFilePath,{folder:"Job_Seekers_Resume"})
                    if(!cloudinaryResponse ||cloudinaryResponse.error){
                         return next(
                              new ErrorHandler("Failed to upload resume to cloud.",500)
                           )
                    }
                    userData.resume={
                           public_id:cloudinaryResponse.public_id,
                           url:cloudinaryResponse.secure_url
                         }
                        }
                catch(error){
                        return next(new ErrorHandler("Failed to upload resume",500));
                }
            }
        }
        const user=await User.create(userData);
        sendToken(user,201,res,"User saved from fucked up")
    }
    catch(error){
    next(error);
    }
})

export const login=catchAsyncErrors(async(req,res,next)=>{
    const {role,email,password}=req.body
    if(!role || !email || !password){
        return next(new ErrorHandler("Email,password and role are required.",400))
    }
    const user=await User.findOne({email})
    if(!user){
        return next(new ErrorHandler("Invalid email and password",400))
    }
   
    const isPasswordMatch=await user.comparePassword(password);
    if(!isPasswordMatch){
        return next(new ErrorHandler("password is not matching",400))
    }
    if(user.role!==role){
        return next(new ErrorHandler("role should be only jobseeker or Employer",400))
    }
    sendToken(user,200,res,"User fucked up")
})

export const logout=catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("token","",{
        expires:new Date(
            Date.now()
        ),
        httpOnly:true
    }).json({
        success:true,
        message:"user logged out"
    })
})

export const getUser=catchAsyncErrors(async(req,res,next)=>{
    const user=req.user
    res.status(200).json({
        success:true,
        message:"you got your toy",
        user
    })
})

export const updateUser=catchAsyncErrors(async(req,res,next)=>{
    const newUserData={
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            address:req.body.address,
            password:req.body.password,
            coverletter:req.body.coverletter,
            niches:{
                firstNiches:req.body.firstNiches,
                secondNiches:req.body.secondNiches,
                thirdNiches:req.body.thirdNiches
            }
            
    }
    const {firstNiches,secondNiches,thirdNiches}=newUserData.niches

    if(req.user.role==="jobSeeker" && (!firstNiches || !secondNiches || !thirdNiches )){
        return  next(new ErrorHandler("Please provide preferred niches.",400));
    }

    if(req.files){
        const {resume}=req.files
        if(resume){
            const currentResumeId=req.user.resume.public_id
            if(currentResumeId){
                await cloudinary.uploader.destroy(currentResumeId)
            }
            const newResume=await cloudinary.uploader.upload(resume.tempFilePath,{
                folder:"Job_Seekers_Resume"
            });
            newUserData.resume={
                public_id:newResume.public_id,
                url:newResume.secure_url
            }
        }
    }

   const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false,
    });
    res.status(200).json({
        success:true,
        user,
        message:"User updated"
    });
 
})

export const updatePassword=catchAsyncErrors(async(req,res,next)=>{
    const {oldPassword,newPassword,confirmPassword}=req.body
    if(!oldPassword || !newPassword){
        return next(new ErrorHandler("Please provide both old and new Password",400))
    }
    const user=await User.findById(req.user.id).select("+password")
    const isPasswordMatch=await user.comparePassword(oldPassword)
    if(!isPasswordMatch){
        return next(new ErrorHandler("Old password is incorrect",400))
    }
    if(newPassword !== confirmPassword){
        return next(new ErrorHandler("New Password and confirm Password should be equal",400));
    }
    if(newPassword.length<8 || newPassword.length>16){
        return next(new ErrorHandler("Password should be between 8 and 16 characters",400));
    }

    user.password=newPassword
    await user.save()
    sendToken(user,200,res,"Password update ho gaya sir")

})