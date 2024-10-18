import React,{useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {  clearAllJobErrors, jobPosting, resetJobSlice } from '../store/slices/jobSlices'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {CiCircleInfo} from "react-icons/ci"


const JobPost = () => {
  const [title,setTitle]=useState("")
  const [jobType,setJobType]=useState("")
  const [location,setLocation]=useState("")
  const [Opening,setOpening]=useState("")
  const [companyName,setCompanyName]=useState("")
  const [description,setDescription]=useState("")
  const [salary,setSalary]=useState("")
  const [qualification,setQualification]=useState("")
  const [offer,setOffer]=useState("")
  const [personalWebsiteTitle,setPersonalWebsiteTitle]=useState("")
  const [personalWebsiteUrl,setPersonalWebsiteUrl]=useState("")
 const  [jobNiches,setJobNiches]=useState("")
  const [jobPostedOn,setJobPostedOn]=useState("")
  const [postedBy,setPostedBy]=useState("")


  const jobNichesArray = [
    "Software Development",
    "Data Science",
    "Digital Marketing",
    "Graphic Design",
    "Content Writing",
    "Cybersecurity",
    "Healthcare",
    "Finance and Accounting",
    "Project Management",
    "Sales and Business Development",
    "Human Resources",
    "Education and Training",
    "Manufacturing and Production",
    "Real Estate",
    "Customer Service",
    "Research and Development",
    "Logistics and Supply Chain",
    "Legal Services",
    "Environmental Science",
    "Art and Entertainment"
  ];
  const citiesInIndia = [
    "Mumbai",
    "Delhi",
    "Bengaluru",
    "Kolkata",
    "Chennai",
    "Hyderabad",
    "Ahmedabad",
    "Pune",
    "Jaipur",
    "Surat",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Visakhapatnam",
    "Indore",
    "Thane",
    "Chandigarh",
    "Bhopal",
    "Coimbatore",
    "Patna",
    "Vadodara"
  ];
  

  const {isAuthenticated,user}=useSelector(state=>state.user)
  const {loading,error,message}=useSelector(state=>state.jobs)
  const dispatch=useDispatch()
  const navigateTo=useNavigate()

  const handleJobPost = () => {
    const formData = new FormData();
    formData.append("title", title)
    formData.append("jobType", jobType)
    formData.append("location", location)
    Opening && formData.append("Opening", Opening)
    formData.append("companyName", companyName)
    formData.append("description", description)
    formData.append("salary", salary)
    formData.append("qualification", qualification)
    personalWebsiteTitle && formData.append("personalWebsiteTitle", personalWebsiteTitle)
    personalWebsiteUrl && formData.append("personalWebsiteUrl", personalWebsiteUrl)

   offer && formData.append("offer", offer)
    formData.append("jobNiches", jobNiches)
    formData.append("jobPostedOn", jobPostedOn)
    formData.append("postedBy", postedBy)

    dispatch(jobPosting(formData))
}


  useEffect(()=>{
    if(error){
      toast.error(error)
      dispatch(clearAllJobErrors())
    }
    if(message){
      toast.success(message)
    //dispatch(resetJobSlice())
    }
  },[dispatch,error,loading,message])

  return (
    <div className='account_components'>
   
    <h3>Post Your Job</h3>
    <div className="">
      <label>Title</label>
      <input type="text"  value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Job Title"/>
    </div>
    <div className="">
      <label>Job Type</label>
    <select value={jobType} onChange={(e)=>setJobType(e.target.value)} >
<option value=""> Select Job Type</option>
<option value="FullTime"> FullTime</option>
<option value="PartTime"> PartTime</option>
<option value="Internship">Internship</option>
    </select>
    </div>
    <div className="">
      <label>Location</label>
      <select value={location} onChange={(e)=>setLocation(e.target.value)}>
      <option value=""> Select Location</option>
        {
          citiesInIndia.map(element=>{
            return (
              <option value={element}>{element}</option>
            )
          })
        }


    </select>
    </div>
    <div className="">
      <div>
      <label>Opening</label>
      <span><CiCircleInfo/> Optional</span>
      </div>
      <input type="text"  value={Opening} onChange={(e) => setOpening(e.target.value)} placeholder="No. Of Openings"/>
    </div>
    <div className="">
      <label>Company Name</label>
      <input type="text"  value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company name"/>
    </div>
    <div className="">
      <label>Description</label>
    <textarea value={description} onChange={(e)=>setDescription(e.target.value)} row={7}/>
    </div>
    <div className="">
      <label>Salary</label>
      <input type="text"  value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="50000-80000"/>
    </div>
    <div className="">
      <label>Qualification</label>
      <textarea placeholder="Required Qualification For Jobs" value={qualification} onChange={(e) => setQualification
        (e.target.value)}/>
    </div>
    <div className="">
     <div>
     <label> what we Offer</label>
     <span><CiCircleInfo/> Optional</span>
     </div>
      <textarea  value={offer} onChange={(e) => setOffer
        (e.target.value)} placeholder="What We Offering In return "/>
    </div>
    <div>
      <label>Job Niche</label>
      <select value={jobNiches} onChange={(e)=>setJobNiches(e.target.value)}>
      <option value=""> Select Job Niches</option>
        {
          jobNichesArray.map(element=>{
            return (
              <option value={element}>{element}</option>
            )
          })
        }
    </select>
    </div>
    <div className="">
      <h4 style={{color:"blue"}}>Personal Website Name</h4>
     
     
      <input type="text"  value={personalWebsiteTitle} onChange={(e) => setPersonalWebsiteTitle
        (e.target.value)} placeholder="title"/>
    
      
      <input type='text'  value={personalWebsiteUrl} onChange={(e) => setPersonalWebsiteUrl
        (e.target.value)} plaaceholder="Url"/>
      
    </div>

      <div className='save_change_btn_wrapper'>
      <button className='btn' onClick={handleJobPost} disabled={loading} style={{margin:"0 auto"}}> Post New Job </button>
      </div>
     
    
    </div>
  )
}

export default JobPost