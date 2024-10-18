import mongoose from "mongoose";

export const connection=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"JOB_PORTAL_WITH_AUTOMATION"
    }).then(()=>{
        console.log("COnnected to Databse")
    }).catch(err=>{
        console.log(`some error occured while connecting to databse:${err}`)
    })
}