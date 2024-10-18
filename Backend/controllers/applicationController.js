import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import {v2 as cloudinary}  from "cloudinary"

export const postApplication=catchAsyncErrors(async(req,res,next)=>{
     const {id}=req.params
     const {name,email,address,phone,coverLetter}=req.body
     console.log(name,email,address,phone,coverLetter)
     if( !name || !email || !address || !phone  || !coverLetter){

          return next(new ErrorHandler("All fields are required",400))
     }
     const jobSeekerInfo={
        id:req.user._id,
        name,email,address,phone,coverLetter,
        role:"jobSeeker",
     }
     const jobDetails=await Job.findById(id);
     if(!jobDetails){
        return next(new ErrorHandler("Job not found",404));
     }
     const isApplied=await Application.findOne({
        "jobInfo.jobId":id,
        "jobSeekerInfo.id":req.user._id,
     })
     if(isApplied){
        return next(new ErrorHandler("you already applied to this job",400))
     }
     if(req.files && req.files.resume){
          const {resume}=req.files
          try{
             const cloudinaryResponse=await cloudinary.uploader.upload(resume.tempFilePath,{
                folder:"Job_Seekers_Resume",

             })
             if (!cloudinaryResponse || cloudinaryResponse.error){
                 return next(new ErrorHandler("Resume is not uploaded",500))
             }
             jobSeekerInfo.resume={
                public_id:cloudinaryResponse.public_id,
                url:cloudinaryResponse.secure_url
             }
          }
          catch(err){
            return next(new ErrorHandler("Resume is not uploaded",500))
          }
     }
     else{
        if(req.user && !req.user.resume.url){
            return next(new ErrorHandler("Please upload your resume",400))
        }
        jobSeekerInfo.resume={
            public_id:req.user && req.user.resume.public_id,
            url:req.user && req.user.resume.url
        }
     }
     const employerInfo={
       id:jobDetails.postedBy,
       role:"Employer",
     }

     const jobInfo={
         jobId:id,
         jobTitle:jobDetails.title,
     }

     const application=await Application.create({
        jobSeekerInfo,
        employerInfo,
        jobInfo,
     })
     res.status(201).json({
        success:true,
        application,
        message:"job Application Posted"
     })



})
export const employerGetAllApplication=catchAsyncErrors(async(req,res,next)=>{
      const {_id}=req.user
      const allApplication=await Application.find({
        "employerInfo.id":_id,
        "deletedBy.employer":false,

      })
      res.status(201).json({
        success:true,
        allApplication,
        message:"le chutiye le le saare application",
      })
})
export const jobSeekerGetAllApplication=catchAsyncErrors(async(req,res,next)=>{
    const {_id}=req.user
    const allApplication=await Application.find({
      "jobSeekerInfo.id":_id,
      "deletedBy.jobSeeker":false,

    })
    res.status(201).json({
      success:true,
      allApplication,
      message:"le chutiye le le saare application",
    })
})
export const deleteApplication=catchAsyncErrors(async(req,res,next)=>{
     const {id}=req.params
     const application =await Application.findById(id);
     if(!application){
        return next(new ErrorHandler("application not found"));
     }
     const {role}=req.user
     switch (role){
        case "Employer":
            application.deletedBy.employer=true;
            await application.save();
            break;
        case "jobSeeker":
            application.deletedBy.jobSeeker=true;
            await application.save();
            break;
        default:
            console.log("default case for application delete function");
     }
     if(application.deletedBy.employer===true && application.deletedBy.jobSeeker===true){
        await application.deleteOne();
     }

     res.status(200).json({
        success:true,
        message:"application deleted"
     })

})