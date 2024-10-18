import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearAllUserErrors, logout } from '../store/slices/userSlice';
import {LuMoveRight} from "react-icons/lu"
import MyProfile from "../components/MyProfile"
import Myapplications from "../components/Myapplications"
import MyJobs from "../components/MyJobs"
import UpdatePassword from "../components/UpdatePassword"
import UpdateProfile from "../components/UpdateProfile"
import JobPost from '../components/JobPost';
import Applications from "../components/Applications"

const Dashboard = () => {
  const [show,setShow]=useState("false");
  const [componentName,setComponentName]=useState("My Profile");

  const {isAuthenticated,loading,error,user}=useSelector((state)=>state.user)

  const dispatch=useDispatch();
  const navigateTo=useNavigate();

  const handleLogout=()=>{
    dispatch(logout());
    toast.success('Loggged Out scueessfully.')
  }

  useEffect(()=>{
    if(error){
      toast.error(error);
       dispatch(clearAllUserErrors());
    }
    if(!isAuthenticated){
      navigateTo("/");
    }

  },[dispatch,error,loading,isAuthenticated])

  return (
    <section className='account'>
            <div className="component_header">
              <p>Dashboard</p>
              <p>Welcome! <span>{user && user.name}  </span></p>
            </div>
            <div className="container">
              <div className={show ? "sidebar showSidebar" :"sidebar"}>
                 <ul className='"sidebar_links'>
                  <h4>Manage Accounts</h4>
                        <li>
                        <button onClick={()=>{
                          setComponentName("My Profile");
                          setShow(!show)
                        }
                        }>
                             My Profile
                        </button>
                        </li>
                       <li>
                       <button onClick={()=>{
                          setComponentName("Update Profile");
                          setShow(!show)
                        }
                        }>
                          Update Profile
                        </button>
                       </li>
                       <li>
                       <button onClick={()=>{
                          setComponentName("Update Password");
                          setShow(!show)
                        }
                        }>
                          Update Password
                        </button>
                       </li>

                        {
                          user.role ==="Employer" &&(
                           <li>
                             <button onClick={()=>{
                              setComponentName("Job Post");
                              setShow(!show)
                            }
                            }>
                             Post new Jobs
                            </button>
                           </li>
                          )
                        }
                         {
                          user.role ==="Employer" &&(
                           <li>
                             <button onClick={()=>{
                              setComponentName("My Jobs");
                              setShow(!show)
                            }
                            }>
                            My Jobs
                            </button>
                           </li>
                          )
                        }
                        {
                            user.role ==="Employer" &&(
                              <li>
                                <button onClick={()=>{
                                setComponentName("Aplications");
                                setShow(!show)
                              }
                              }>
                              Applications
                              </button>
                              </li>
                            )
                        }
                        {
                            user.role ==="jobSeeker" &&(
                            <li>  <button onClick={()=>{
                              setComponentName("My Applications");
                              setShow(!show)
                            }
                            }>
                            My Applications
                            </button></li>
                            )
                        }
                      
                       
                        <button onClick={handleLogout
                        }>
                          Logout
                        </button>
                 </ul>
              </div>
              <div className="banner">
                <div className={show ? "sidebar_icon move_right" :"sidebar_icon move_left"}>
                     <LuMoveRight onClick={()=>setShow(!show)} className={show ? "left_arrow" :"right_arrow"}/>
                </div>
                {
                  (()=>{
                    switch (componentName) {
                      case "My Profile":
                        return <MyProfile/>
                        break;
                      case "Update Profile":
                        return <UpdateProfile/>
                        break;
                      
                      case "Update Password":
                        return <UpdatePassword/>
                        break;
                      case "Job Post":
                        return <JobPost/>
                        break;
                      case "My Jobs":
                        return <MyJobs/>
                        break;
                      case "My Applications":
                        return <Myapplications/>
                        break;
                      case "Aplications":
                        return <Applications/>
                        break;
                      default:
                        return <MyProfile/>
                        break;
                    }
                  })()
                }
              </div>
            </div>
    </section>
  )
}

export default Dashboard