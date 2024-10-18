import React from 'react'
import {useSelector} from "react-redux"

const MyProfile = () => {
  const {user}=useSelector((state)=>state.user)
  return (
    <div className='account_components'>
      <h3>My Profile</h3>
      <div className="">
        <label>Full name</label>
        <input type="text" disabled value={user && user.name} onChange={(e) => e.target.value}/>
      </div>
      <div className="">
        <label>Email Address</label>
        <input type="email" disabled value={user && user.email} onChange={(e) => e.target.value}/>
      </div>
      {
        user && user.role === "jobSeeker" && (
         <>
          <div className="">
        <label>My preferred Job Niches</label>
        <div style={{display:"flex", flexDirection:"column", gap:"15px"}}>
        <input type="email" disabled value={user && user.niches.firstNiches} onChange={(e) => e.target.value}/>
        <input type="email" disabled value={user && user.niches.secondNiches} onChange={(e) => e.target.value}/>
        <input type="email" disabled value={user && user.niches.thirdNiches} onChange={(e) => e.target.value}/>
        </div>
      </div>
   <div className="">
       <label>Cover Letter </label>
       <input type="text" disabled value={user && user.coverLetter} onChange={(e)=>e.target.value}/>
     </div>
         
     </>
        )
      }
        
      <div className="">
        <label>Phone Number</label>
        <input type="number" disabled value={user && user.phone} onChange={(e)=>e.target.value}/>
      </div>
      <div className="">
        <label>Adddress</label>
        <input type="text" disabled value={user && user.address} onChange={(e)=>e.target.value}/>
      </div>
      <div className="">
        <label>Role</label>
        <input type="text" disabled value={user && user.role} onChange={(e)=>e.target.value}/>
      </div>
     
      <div className="">
        <label>Joined On</label>
        <input type="text" disabled value={ user?.createdAt ? user.createdAt.substring(0, 10):"Date not available"} onChange={(e)=>e.target.value}/>
      </div>
    </div>
  )
}

export default MyProfile