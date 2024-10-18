import React, { useEffect,useState } from 'react'
import {useSelector,useDispatch} from "react-redux"
import {useParams,useNavigate} from "react-router-dom"
import { clearAllApplicationErrors, postApplication, resetApplicationSlice } from '../store/slices/applicationSlice'
import { toast } from 'react-toastify'
import { fetchSingleJob } from '../store/slices/jobSlices'
import {IoMdCash} from "react-icons/io"
import { FaToolbox } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'




const PostApplication = () => {
  const {singleJob}=useSelector((state)=>state.jobs)
  console.log(singleJob)
  const {isAuthenticated,user}=useSelector((state)=>state.user)
  const {loading,error,message}=useSelector((state)=>state.applications)

  const {jobId}=useParams()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  console.log(user);
  
const navigateTo=useNavigate();
const dispatch=useDispatch();

const handlePostApplication=(e)=>{
  e.preventDefault();
  const formData=new FormData();
  formData.append("name",name);
  formData.append("email",email);
  formData.append("phone",phone);
  formData.append("address",address);
  formData.append("coverLetter",coverLetter);
  if(resume){
    formData.append("resume",resume);
  }

 
  dispatch(postApplication(formData,jobId))
 
}

useEffect(()=>{
 if(user){
    setName(user.name || "");
    setEmail(user.email || "");
    setAddress(user.address || "");
    setPhone(user.phone || "");
    setCoverLetter(user.coverLetter || "");
    setResume(user.resume && user.resume.url || "")
 }
  if(error){
    toast.error(error)
    dispatch(clearAllApplicationErrors())
  }
  if(message){
    toast.success(message)
    dispatch(resetApplicationSlice())
  }
  if(user && user.role==="Employer" || !isAuthenticated){
    navigateTo("/")
  }
  dispatch(fetchSingleJob(jobId))
},[dispatch,error,message,jobId,user])

let qualification=[];
let offering=[];
let responsibilties=[]

if(singleJob.qualification){
  qualification=singleJob.qualification.split(".");
}
if(singleJob.offer){
  offering=singleJob.offer.split(". ");
}
if(singleJob.responsibilities){
  responsibilties=singleJob.responsibilities.split(". ");
}

const resumumeHandler=(e)=>{
   const file=e.target.files[0];
   setResume(file)
}

  return (
   <article className='application_page'>
  
  {
    user && (
      <form onSubmit={handlePostApplication}>
      <h3>
        Application Form
      </h3>
      <div>
        <label>
          Job Title
        </label>
        <input type="text" placeholder={singleJob.title} disabled/>
      </div>
      <div>
        <label>
          Your name
        </label>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
      </div>
      <div>
        <label>
        Email
        </label>
        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </div>
      <div>
        <label>
          Phone Number
        </label>
        <input type="number" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
      </div>
      <div>
        <label>
          Address
        </label>
        <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)}/>
      </div>
      <div>
        <label>
          CoverLetter
        </label>
      <textarea value={coverLetter} onChange={(e)=>setCoverLetter(e.target.value)} rows={10}></textarea>
      </div>
      <div>
        <label>
          Resume
        </label>
        <input type="file"  onChange={resumumeHandler}/>
      </div>
    {
      user.role==="jobSeeker" && (<div style={{alignItems:"flex-end"}}>
        <button type="submit" className='btn' disabled={loading}>Apply</button>
      </div>)
    }
      
        </form>
    )
  }
     
  
    <div className="job-details">
      <header>
        <h3>{singleJob.title}</h3>
        {
          singleJob.personalWebsite && (
            <Link to={singleJob.personalWebsite.url}>{singleJob.personalWebsite.title}</Link>
          )
        }
        <p>{singleJob.location}</p>
        <p>Rs. {singleJob.salary} a  month</p>
      </header>
      <hr/>
      <section>
        <div className="wrapper">
          <h3>Job details</h3>
<div>
  <IoMdCash/>
  <div>
    <span>Pay</span>
    <span>{singleJob.salary} a month</span>
  </div>
</div>
<div>
  <FaToolbox/>
  <div>
    <span>Job Type</span>
    <span>{singleJob.jobType}</span>
  </div>
</div>
        </div>
        <hr/>
        <div className="wrapper">
          <h3>Location</h3>
          <div className="location-wrapper">
            <FaLocationDot/>
            <span>{singleJob.location}</span>
          </div>
        </div>
        <hr/>
        <div className="wrapper">
          <h3>Full Job description</h3>
          <p>{singleJob.description}</p>
          {
            singleJob.qualification && (
              <div>
                <h4>Qualification</h4>
                <ul>
                 {
                  qualification.map(element=>(
                    <li key={element} style={{ listStyle:"inside"}}>{element}</li>
                  ))
                 }
                </ul>
                </div>
            )
          }
          {
            singleJob.responsibilities && (
              <div>
                <h4>Reponsibilities</h4>
                <ul>
                 {
                  responsibilties.map(element=>(
                    <li key={element} style={{ listStyle:"inside"}}>{element}</li>
                  ))
                 }
                </ul>
                </div>
            )
          }
          {
            singleJob.offer && (
              <div>
                <h4>Offers</h4>
                <ul>
                 {
                  offering.map(element=>(
                    <li key={element} style={{ listStyle:"inside"}}>{element}</li>
                  ))
                 }
                </ul>
                </div>
            )
          }
        </div>
      </section>
      <hr/>
      <footer>
        <h3>Job Niches</h3>
        <p>{singleJob.jobNiches}</p>
      </footer>
    </div>
   </article>
  )
}

export default PostApplication