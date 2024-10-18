import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { clearAllJobErrors, deleteJob, getMyJob, resetJobSlice } from '../store/slices/jobSlices'
import Spinner from "../components/Spinner"

const MyJobs = () => {
  const {loading,error,myJobs,message}=useSelector(state=>state.jobs)
  console.log(myJobs)
  const dispatch=useDispatch()
  
  

  useEffect(()=>{
    dispatch(getMyJob());
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
    }
    return () => {
      dispatch(resetJobSlice());
    };
  },[dispatch,error,message])

  const handleDeleteJob=(id)=>{
    dispatch(deleteJob(id))

  }
 

  return (
  <>
   {
    loading ? (<Spinner/>):(

      myJobs && myJobs.length ===0 ?(
        <h1 style={{fontSize:"1.4rem",fontWeight:"600"}}>You have not posted any Job yet</h1>
      ):(
        <>
<div className="account_components">
  <h3>My Jobs</h3>
  <div className="application_container">
    {
      myJobs.map(element=>(
        <div className='card' key={element._id}>
          <p className="sub-sec">
            <span>Job Title</span>{element.title}
          </p>
          <p className="sub-sec">
            <span>job Niche</span>{element.jobNiches}
          </p>
          <p className="sub-sec">
            <span>Salary:</span>{element.salary}
          </p>

          <p className="sub-sec">
            <span>Location:</span>{element.location}
          </p>
          <p className="sub-sec">
            <span>Job Type</span>{element.jobType}
          </p>
          <p className="sub-sec">
            <span>Company Name</span>{element.companyName}
          </p>
          <p className="sub-sec">
            <span>description</span>{element.description}
          </p>
          <p className="sub-sec">
            <span>Qualification</span>{element.qualifications}
          </p>
          {
            element.offer && (
              <p className="sub-sec">
              <span>What are we Offering?</span>{element.offer}
            </p>
            )
          }
          <button className='btn' onClick={()=>handleDeleteJob(element._id)}>Delete Job</button>
        </div>
      ))
    }
  </div>
</div>
        </>
      )
    )
   }
  </>
  )
}

export default MyJobs