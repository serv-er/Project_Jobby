import React,{useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import { useNavigate ,Link} from 'react-router-dom'
import { clearAllUpdateProfileErrors, updateProfile } from '../store/slices/updateSlice'
import { toast } from 'react-toastify'
import { getUser } from '../store/slices/userSlice'

const UpdateProfile = () => {
  const {user}=useSelector(state=>state.user)
  const {loading,error,isUpdated}=useSelector(state=>state.updateProfile)
  const dispatch=useDispatch()
  const navigateTo=useNavigate()

  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phone);
  const [address, setAddress] = useState(user && user.address);
 const [firstNiches,setFirstNiches]=useState(user && user.niches ?.firstNiches);
 const [secondNiches,setSecondNiches]=useState(user && user.niches ?.secondNiches);
 const [thirdNiches,setThirdNiches]=useState(user && user.niches ?.thirdNiches)
  const [coverLetter, setCoverLetter] = useState(user && user.coverLetter);
  const [resume,setResume]=useState(null);
  const [resumePreview,setResumePreview]=useState(user && user.resume?.url )


  const resumeHandler=(e)=>{
    const file=e.target.files[0];
    console.log(file)
    if (file){
      const reader=new FileReader();
      reader.readAsDataURL(file);
      reader.onload=()=>{
        setResumePreview(reader.result);
        setResume(file);
    }
    
    }
  }

  const jobNiches = [
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

  const handleUpdateProfile=()=>{
    const formData=new FormData();
    formData.append("name",name);
    formData.append("email",email);
    formData.append("phone",phone);
    formData.append("address",address);
    if(user && user.role==="jobSeeker"){
      formData.append("firstNiches",firstNiches);
    formData.append("secondNiches",secondNiches);
    formData.append("thirdNiches",thirdNiches);
    formData.append("coverLetter",coverLetter);
    formData.append("resume",resume);
    }
 if(resume){
  formData.append("resume",resume);
 }
 dispatch(updateProfile(formData))
  }

useEffect(()=>{
    
      if(error){
        toast.error(error);
        dispatch(clearAllUpdateProfileErrors())
      }
      if(isUpdated)
      {
        toast.success("Profile Updated")
        dispatch(getUser());
        dispatch(clearAllUpdateProfileErrors())
      }
  },[dispatch,loading,error,isUpdated,user])

  return (
    <div className='account_components'>
      <h3>Update Profile</h3>
      <div className="">
        <label>Full name</label>
        <input type="text"  value={name} onChange={(e) => setName(e.target.value)}/>
      </div>
      <div className="">
        <label>Email Address</label>
        <input type="email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
      </div>
      <div className="">
        <label>Phone Number</label>
        <input type="number"  value={phone} onChange={(e)=>setPhone(e.target.value)}/>
      </div>
      <div className="">
        <label>Adddress</label>
        <input type="text"  value={address} onChange={(e)=>setAddress(e.target.value)}/>
      </div>
      {
        user && user.role === "jobSeeker" && (
          <>
          <div className="">
        <label>My preferred Job Niches</label>
        <div style={{display:"flex", flexDirection:"column", gap:"15px"}}>
          <select value={firstNiches} onChange={(e)=>setFirstNiches(e.target.value)}>
            {
              jobNiches.map((element,index)=>{
                return (
                  <option value={element} key={index}>{element}</option>
                )
              })
            }
          </select>
          <select value={secondNiches} onChange={(e)=>setSecondNiches(e.target.value)}>
            {
              jobNiches.map((element,index)=>{
                return (
                  <option value={element} key={index}>{element}</option>
                )
              })
            }
          </select>
          <select value={thirdNiches} onChange={(e)=>setThirdNiches(e.target.value)}>
            {
              jobNiches.map((element,index)=>{
                return (
                  <option value={element} key={index}>{element}</option>
                )
              })
            }
          </select>
       
        </div>
      </div>
      <div>
        <label> CoverLetter</label>
        <textarea value={coverLetter} onChange={(e)=>setCoverLetter(e.target.value)} rows={5}/>
      </div>
      <div>
        <label> upload  Resume</label>
        <input type="file" onChange={resumeHandler} />
        {
          user && user.resume && (
            <div className="">
              <p>Current Resume</p>
              <Link to={user.resume && user.resume.url} target="_blank" className="view-resume">View Resume</Link>
            </div>
          )
        }
      </div>
      </>
        )
      }
      <div className='save_change_btn_wrapper'>
        <button className='btn' onClick={handleUpdateProfile} disabled={loading}>
          Save changes
        </button>
      </div>
    </div>
  )
}

export default UpdateProfile