import cron from "node-cron"
import {Job} from "../models/jobSchema.js"
import {User} from "../models/userSchema.js"
import { sendEmail } from "../utils/sendEmail.js"


export const newsLetterCron=()=>{
    cron.schedule("*/1 * * * *",async()=>{
       // console.log("Running Cron Automatically")
      const jobs=await Job.find({newsLetterSent:false});
      for(const job of jobs){
        try{
          const filteredUsers=await User.find({
            $or:[{"niches.firstNiches":job.jobNiches},
                {"niches.secondNiches":job.jobNiches},{
                    "niches.thirdNiches":job.jobNiches
                },
            ]
          })
          for(const user of filteredUsers){
            const subject=`Hot Job Alert: ${job.title} in ${job.jobNiche} Available Now`;
            const message=`Hi ${user.name} \n\n Great news! A new job that fits your niche has just been posted. The position is for a ${job.title}
            \n- **Company:** ${job.companyName}\n- **Location** ${job.location}\n- **salary** ${job.salary}\n\n Don't wait too long! Job openings
            like these are filled quickly. \n\n We're here to support you in your job search. Beat of luck !\n\n Best Regards,
            \nNicheNest Team`;
            sendEmail({
                email:user.email,
                subject,
                message,
            })
          }
          job.newsLetterSent=true;
          await(job.save());
        }
        catch(error){
         console.log("Error IN Nodecron catch block");
         return next(console.error(error || "Some error occured in cron"))
        }
      }
    })
}