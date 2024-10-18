class ErrorHandler extends Error{
    constructor(message,statusCode){
          super(message);
          this.statusCode=statusCode
    }
}

export const errorMiddleware=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message || "Internal server Error";

    

    if (err.name==="CastError"){
        const message=`Invalid ${err.path}`;
        err=new ErrorHandler(message,400);

    }
// 11000 is used to know about database error mostly 
    if(err.code===11000){
        const message= `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message,400);
    }

    if (err.name==="jsonwebTokenError"){
        const message=``
    }

    if (err.name==="TokenExpiredError"){
        const message=`json web token is expired, Please Try again`;
        err= new ErrorHandler (message,400)
    }

    return res.status(err.statusCode).json({
        success:false,
        message:err.message,
        err:err
    })
   
  
}


export default ErrorHandler