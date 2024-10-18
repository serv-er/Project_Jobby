import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";


 const userSchema=new mongoose.Schema({
    name:{
   type:String,
   required:true,
   minLength:[3,"Name must contain atleast three characters"],
    },
    email:{
type:String,
required:true,
validate:[validator.isEmail,"Please provide valid email"]
    },
    phone:{
type:Number,
required:true,
    },
    address:{
   type:String,
   required:true,
    },
    niches:{
    firstNiches:String,
    secondNiches:String,
    thirdNiches:String
    },
    password:{
  type:String,
  required:true,
    },
    resume:{
     public_id:String,
      url:String,
    },
    coverLetter:{
        type:String
    },
    role:{
        type:String,
        required:true,
        enum:["jobSeeker","Employer"]
    },
       createdAt:{
        type:Date,
        default:Date.now()
    },
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
         next()
    }
    this.password=await bcrypt.hash(this.password,10);
})

userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_kEY,{
        expiresIn:process.env.JWT_EXPIRE,
    });
}

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

export const User =mongoose.model(
"User",userSchema
)