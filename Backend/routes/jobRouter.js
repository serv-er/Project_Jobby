import express from "express"
import { isAuthenticated ,isAuthorized} from "../middleware/auth.js";
import { postJob,getAllJobs,getMyjob,deleteJob,getSpecificJob } from "../controllers/jobController.js";

const router =express.Router();

router.post("/jobPost",isAuthenticated,isAuthorized("Employer"),postJob)
router.get("/getAll",getAllJobs)
router.get("/getMyJobs",isAuthenticated,isAuthorized("Employer"),getMyjob)
router.delete("/deleteJob/:id",isAuthenticated,isAuthorized("Employer"),deleteJob)
router.get("/getSpecificJob/:id",getSpecificJob)


export default router