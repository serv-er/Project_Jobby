// this is a higher order function which accepts a function inside a function
// this is a utility function that uses to handle asynchronous errors
export const catchAsyncErrors=(theFunction)=>{
     return (req,res,next)=>{
        Promise.resolve(theFunction(req,res,next).catch(next)
    )
     }
}