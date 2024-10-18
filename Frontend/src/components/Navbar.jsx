import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {GiHamburgerMenu} from "react-icons/gi"

const Navbar = () => {
  const [show,setShow]=useState("")
  const {isAuthenticated}=useSelector((state)=>state.user)
  return (
    <>
    <nav className={show ? "navbar show_navbar":"navbar"}>
       <div className="logo">
        <img src="/logo.png" alt="logo"/>
        <h4>Jobby</h4>
       </div>
       <div className='links'>
<ul>
  <li>
    <Link to={"/"} onClick={()=>setShow(!show)}> Home</Link>
  </li>
  <li>
    <Link to={"/jobs"}> Jobs</Link>
  </li>
  {
    isAuthenticated ?(<li>
      <Link to={"/Dashboard"}>Dashboard</Link>
    </li>):( <li>
    <Link to={"/login"}> Login</Link>
  </li>)
  }
 

</ul>
       </div>
       <GiHamburgerMenu className="hamburger" onClick={()=>setShow(!show)}/>
    </nav>
    </>
  )
}

export default Navbar