import express from "express"
import { postApplication,employerGetAllApplication,jobSeekerGetAllApplication,deleteApplication } from "../controllers/applicationController.js"
import { isAuthenticated,isAuthorized } from "../middleware/auth.js"


const router = express.Router();


router.post("/postApplication/:id",isAuthenticated,isAuthorized("jobSeeker"),postApplication)
router.get("/employer/GetAll",isAuthenticated,isAuthorized("Employer"),employerGetAllApplication)
router.get("/jobSeeker/GetAll",isAuthenticated,isAuthorized("jobSeeker"),jobSeekerGetAllApplication)
router.delete("/delete/:id",isAuthenticated,deleteApplication)

export default router