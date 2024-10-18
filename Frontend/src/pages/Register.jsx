import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate,Link } from 'react-router-dom'
import { clearAllUserErrors, register } from '../store/slices/userSlice'
import { toast } from 'react-toastify'
import {FaAddressBook, FaPencilAlt, FaRegUser} from "react-icons/fa"
import {FaPhoneFlip} from "react-icons/fa6"
import {MdOutlineMailOutline} from "react-icons/md"
import {RiLock2Fill} from "react-icons/ri"

const Register = () => {
  const [role,setRole]=useState("")
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [phone,setPhone]=useState("")
  const [address,setAddress]=useState("")
  const [password,setPassword]=useState("")
  const [firstNiches,setFirstNiche]=useState("")
  const [secondNiches,setSecondNiche]=useState("")
  const [thirdNiches,setThirdNiche]=useState("")
  const [coverLetter,setCoverletter]=useState("")
  const [resume,setResume]=useState("")


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

  const resumeHandler=(e)=>{
    const files=e.target.files[0]
    setResume(files);
  }

  const {loading,isAuthenticated,error,message}=useSelector((state)=>state.user)
  const dispatch=useDispatch()
  const navigateTo=useNavigate()


  const handleRegister=(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append("role",role);
    formData.append("name",name);
    formData.append("email",email);
    formData.append("phone",phone);
    formData.append("address",address);
    formData.append("password",password);
    if(role==="jobSeeker"){
      formData.append("firstNiches",firstNiches);
      formData.append("secondNiches",secondNiches);
      formData.append("thirdNiches",thirdNiches);
      formData.append("coverLetter",coverLetter);
      formData.append("resume",resume)

    }
   dispatch(register(formData))

  }

  useEffect(()=>{
      if(error){
        toast.error(error)
        dispatch(clearAllUserErrors())
      }
      if(isAuthenticated){
        navigateTo("/")
      }
  },[dispatch,error,loading,isAuthenticated,message])

  return (
    <section className='authPage'>
      <div className="container">
        <div className="header">
          <h3>
            Create a new account 
          </h3>
        </div>
        <form onSubmit={handleRegister}>
                <div className="wrapper">
  <div className="inputTag">
    <label>Register As</label>
       <div>
        <select value={role} onChange={(e)=>setRole(e.target.value)}>
          <option value="" >
            Select Role
          </option>
          <option value="Employer">
            Register as a Employer
          </option>
          <option value="jobSeeker">
            Register as a jobSeeker
          </option>
        </select>
        <FaRegUser/>
        </div>
  </div>
  <div className="inputTag">
    <label>name</label>
       <div>
       <input type="text" placeholder="Your Name" value={name} onChange={(e)=>setName(e.target.value)}/>
        <FaPencilAlt/>
        </div>
  </div>
                    </div>
                <div className="wrapper">
  <div className="inputTag">
    <label>Email Address</label>
       <div>
        <input
        type="email"
        placeholder='Youremail@gmail.com'
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
        <MdOutlineMailOutline/>
        </div>
  </div>
  <div className="inputTag">
    <label>Phone Number</label>
       <div>
       <input type="number" placeholder="111-5555-566" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
        <FaPhoneFlip/>
        </div>
  </div>
                    </div>
                <div className="wrapper">
  <div className="inputTag">
    <label>Address</label>
       <div>
        <input
        type="text"
        placeholder='Youremail@gmail.com'
        value={address}
        onChange={(e)=>setAddress(e.target.value)}
        />
        <FaAddressBook/>
        </div>
  </div>
  <div className="inputTag">
    <label>Password</label>
       <div>
       <input type="password" placeholder="Your-Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <RiLock2Fill/>
        </div>
  </div>
                    </div>
                    {
                      role==="jobSeeker" && (
                        <>
                          <div className="wrapper">
                            <div className="inputTag">
                              <label>
                                Your First Niche
                              </label>
                              <div className="">
                              <select value={firstNiches} onChange={(e)=>setFirstNiche(e.target.value)}>
                                <option value="">
                                  Your Niche
                                </option>
                                {
                                  jobNiches.map((niche,index)=>{
                                    return (
                                      <option key={index} value={niche}>
                                      {niche}
                                    </option>
                                    )
                                  })
                                }
                              </select>
                              </div>
                            </div>
                            <div className="inputTag">
                              <label>
                                Your Second Niche
                              </label>
                              <div className="">
                              <select value={secondNiches} onChange={(e)=>setSecondNiche(e.target.value)}>
                                <option value="">
                                  Your Niche
                                </option>
                                {
                                  jobNiches.map((niche,index)=>{
                                   return (
                                    <option key={index} value={niche}>
                                    {niche}
                                  </option>
                                   )
                                  })
                                }
                              </select>
                              </div>
                            </div>
                            <div className="inputTag">
                              <label>
                                Your Third Niche
                              </label>
                              <div className="">
                              <select value={thirdNiches} onChange={(e)=>setThirdNiche(e.target.value)}>
                                <option value="">
                                  Your Niche
                                </option>
                                {
                                  jobNiches.map((niche,index)=>{
                                    return (
                                      <option key={index} value={niche}>
                                      {niche}
                                    </option>
                                    )
                                  })
                                }
                              </select>
                              </div>
                            </div>
                          </div>
                          <div className="wrapper">
                            <div className="inputTag">
                               <label>CoverLetter</label>
                               <div>
                                   <textarea value={coverLetter} onChange={(e)=>setCoverletter(e.target.value)} rows={10}></textarea>
                               </div>
                            </div>
                           </div>
                           <div className="wrapper">
                            <div className="inputTag">
                               <label>Resume</label>
                               <div>
                                  <input type="file" onChange={resumeHandler} style={{ border:"none"}}/>
                               </div>
                            </div>
                           </div>
                        </>
                      )
                    }
                    <button type="submit" disabled={loading}>Register</button>
                   <Link to={"/login"}>Login now</Link>
        </form>
      </div>
    </section>
  )
}

export default Register