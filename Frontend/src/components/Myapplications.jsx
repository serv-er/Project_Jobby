import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearAllApplicationErrors, deleteApplication, fetchJobSeekerApplications, resetApplicationSlice } from '../store/slices/applicationSlice';
import Spinner from "../components/Spinner"


const Myapplications = () => {
  const {user,isAuthenticated}=useSelector(state=>state.user);
  const {loading,error,myApplications,message} = useSelector(state=>state.applications);
  const dispatch=useDispatch()
  const navigateTo=useNavigate()

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllApplicationErrors())
    }
    if(message){
      toast.success("zzzzzzoo this is you all application sir...")
      dispatch(resetApplicationSlice())
    
    }
    dispatch(fetchJobSeekerApplications())
  },[dispatch,error,message])

  const handleDeleteApplication=(id)=>{
    dispatch(deleteApplication(id))
  }

  return (
  <>
  
  {
    loading ?(<Spinner/>):(myApplications && myApplications.length <=0 ?
      (
        <h1 style={{fontSize:"1.4rem", fontWeight:"600"}}>You have not applied for any job</h1>
      ):(

        <>
        <div className="account_components">
          <h3>My applications for jobs</h3>
          <div className="applications_container">
           {
               myApplications.map(element=>{
                return (
                  <div className="card">
                    <p className="sub-sec">
                      <span>job Title</span> {element.jobInfo.jobTitle}
                    </p>
                    <p className="sub-sec">
                      <span>Name:</span> {element.jobSeekerInfo.name}
                    </p>
                    <p className="sub-sec">
                      <span>Email</span> {element.jobSeekerInfo.email}
                    </p>
                    <p className="sub-sec">
                      <span>Phone</span> {element.jobSeekerInfo.phone}
                    </p>
                    <p className="sub-sec">
                      <span>Address</span> {element.jobSeekerInfo.address}
                    </p>
                    <p className="sub-sec">
                      <span>Coverletter</span> 
                      <textarea value={element.jobSeekerInfo.coverLetter} rows={5} disabled></textarea>
                    </p>
                    <p className="sub-sec">
                      <span>job Title</span> {element.jobInfo.jobTitle}
                    </p>
                    <div className="btn-wrapper">
                      <button className='outline_btn' onClick={()=>handleDeleteApplication(element._id)}> Delete Button</button>
                    <Link to={element.jobSeekerInfo && element.jobSeekerInfo.resume.url} className='btn' target="_blank"> View Resume</Link>
                    </div>
                  </div>
                )
               })
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

export default Myapplications