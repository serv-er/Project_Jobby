import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/error.js";
import {Job} from "../models/jobSchema.js"


export const postJob=catchAsyncErrors(async(req,res,next)=>{
    const {title,
        jobType,
        location,
        Opening,
        companyName,
        description,
        salary,
        qualification,
        offer,
        personalWebsiteTitle,
        personalWebsiteUrl,
        jobNiches,
        newsLetterSent,
        jobPostedOn
    }=req.body

    if(!title || !jobType || !location || !Opening || !companyName || !description || !salary || !qualification   || !jobNiches){
        return next(new ErrorHandler("All fields are required",400))
    }
    if ((personalWebsiteTitle && !personalWebsiteUrl)|| (!personalWebsiteTitle && personalWebsiteUrl)){
        return next(new ErrorHandler("Please provide both title and url or leave both blank",400))
    }
    const postedBy=req.user._id;
    const job=await Job.create({
        title,
        jobType,
        location,
        Opening,
        companyName,
        description,
        salary,
        qualification,
        offer,
       personalWebsite:{
        title:personalWebsiteTitle,
        url:personalWebsiteUrl
       },
        jobNiches,
        newsLetterSent,
        jobPostedOn,
        postedBy
    })
    res.status(201).json({
        success:true,
        job,
        message:"Job posted successfully"
    })

})
export const getAllJobs=catchAsyncErrors(async(req,res,next)=>{
    const {city,niches,searchKeyword}=req.query;
    let query={};
    if(city){
        query.location=city;
    }
    if(niches){
        query.jobNiches=niches;
    }
    if(searchKeyword){
        query.$or=[
            { title: { $regex: searchKeyword, $options: "i" } },
    { company: { $regex: searchKeyword, $options: "i" } },
    { description: { $regex: searchKeyword, $options: "i" } },
    { location: { $regex: searchKeyword, $options: "i" } }
        ];
    }
   const jobs=await Job.find(query)
  /* if(jobs.length===0){
     return next(new ErrorHandler("There is no jobs ",400));
   } */
   res.status(201).json({
    success:true,
    jobs,
    count:jobs.length,
    message:"lo ye lo saare jobs"
   })
})
export const getSpecificJob=catchAsyncErrors(async(req,res,next)=>{
     const {id}=req.params
     if(!id){
        return next(new ErrorHandler("are guru job ke id to de do ",400))
     }
     const job=await Job.findById(id)
     if(!job){
        return next(new ErrorHandler("are bhai aisa koi job hi nahi hai",400))
     }
     res.status(201).json({
        success:true,
        job,
        message:"lo ye lo tum apna job"
     })
})
export const getMyjob=catchAsyncErrors(async(req,res,next)=>{
    const employerId=req.user._id
    if(!employerId){
        return next(new ErrorHandler("User does'nt EXist"))
    }
    const jobs=await Job.find({postedBy:employerId})
    if(jobs.length===0){
        return next(new ErrorHandler("There is no job posted by this Employer"))
    }
    res.status(201).json({
        success:true,
        jobs,
        message:"lo bhai employer tum apni saari job pakdo"
    })
})
export const deleteJob=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params
    if(!id){
       return next(new ErrorHandler("are guru job ke id to de do ",400))
    }
    const job=await Job.findById(id)
    if(!job){
       return next(new ErrorHandler("are bhai aisa koi job hi nahi hai",404))
    }
    await job.deleteOne()
    res.status(201).json({
       success:true,
       message:"job Deleted"
    })
})