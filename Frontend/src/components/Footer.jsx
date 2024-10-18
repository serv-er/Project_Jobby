import React from 'react'
import {Link} from "react-router-dom"
import { useSelector } from 'react-redux'
import {FaSquareXTwitter,FaSquareInstagram,FaYoutube,FaLinkedin} from "react-icons/fa6"

const Footer = () => {
  const {isAuthenticated}=useSelector((state)=>state.user)
  return (
    <>
     <footer>
      <div>
        <img src="/logo.png"alt="logo"/>
      </div>
      <div>
      <h4>Support</h4>
      <ul>
      <li>Sultanpur</li>
      <li>lahasun@gmail.com</li>
      <li>+91 5687258689</li>
      </ul>
      </div>
       <div>
        <h4>
          Quick Links
        </h4>
        <ul>
          <li>
            <Link to={"/"}>
            Home
            </Link>
          </li>
          <li>
            <Link to={"/jobs"}>
            Jobs
            </Link>
          </li>
          {
            isAuthenticated &&   <li>
            <Link to={"/dashboard"}>
            Dashboard
            </Link>
          </li>
          }
        
        </ul>
       </div>
       <div>
        <h4>Follow Us</h4>
        <ul>
          <li><Link to={"/"}> <span><FaSquareXTwitter/></span><span>Twitter (X)</span></Link></li>
          <li><Link to={"/"}> <span><FaSquareInstagram/></span><span>Instagram</span></Link></li>
          <li><Link to={"/"}> <span><FaYoutube/></span><span>Youtube</span></Link></li>
          <li><Link to={"/"}> <span><FaLinkedin/></span><span>Linkedin</span></Link></li>
        </ul>
       </div>
     </footer>
     <div className='copyright'> 
         &copy; CopyRight2024. All Rights Reserved with Sarvesh
     </div>
     </>
  )
}

export default Footer