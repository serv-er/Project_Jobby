import express, { application } from "express"
import dotenv from 'dotenv';
import cors from "cors"
import cookieParser from "cookie-parser"
import {connection} from "./database/connection.js"
import { errorMiddleware } from "./middleware/error.js"
import fileUpload from "express-fileupload"
import userRouter from "./routes/userRouter.js"
import jobRouter from "./routes/jobRouter.js"
import applicationRouter from "./routes/applicationRouter.js"
import { newsLetterCron } from "./automation/newsLetterCron.js";


const app=express();

dotenv.config()

//cprs middleware used to connect backend and frontend
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","DELETE","PUT"],
    credentials:true,

})
);

// To access the jwtToken in backend after generation
//we use middleware cookieparser
app.use(cookieParser());
// it use used to parse json data  incoming from  request body 
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// we use this in place of multer 
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
})
);

app.use("/api/v1/user",userRouter);
app.use("/api/v1/job",jobRouter);
app.use("/api/v1/application",applicationRouter)

newsLetterCron()
connection();

//it is a reference to a function not a function call so we did'nt use parenthesis
app.use(errorMiddleware)

export default app