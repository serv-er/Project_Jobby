import mongoose from "mongoose";


const jobSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    jobType:{
        type:String,
        required:true,
        enum:["FullTime","PartTime","Internship","Remote"]
    },
    location:{
        type:String,
        required:true,
    },
    companyName:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    salary:{
        type:String,
        required:true
    },
    qualification:{
        type:String,
    },
    offer:{
        type:String,
    },
    Opening:{
        type:Number,
        required:true
    },
 /*   responsibilities:{
        type:String,
        required:true,
    }, */
    personalWebsite:{
        title:String,
        url:String,
    },
    jobNiches:{
        type:String,
        required:true,
    },
    newsLetterSent:{
        type:Boolean,
        default:false
    },
    jobPostedOn:{
        type:Date,
        default:Date.now()
    },
    hiringMultipleCandidates:{
      type:Boolean,
      default:false
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,    
        ref:"User",
        required:true,

    },  
})

export const Job=mongoose.model("Job",jobSchema)