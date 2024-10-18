import React, { useEffect } from 'react'
import "./App.css"
import {Routes,Route} from "react-router-dom"
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import PostApplication from './pages/PostApplication'
import Footer from './components/Footer'
import NotFound from './pages/NotFound'
import Jobs from './pages/Jobs'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import { getUser } from './store/slices/userSlice'



const App = () => {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getUser())
  },[])
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/jobs" element={<Jobs/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/post/application/:jobId" element={<PostApplication/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    <Footer/>
    <ToastContainer position='bottom-right' theme="dark"/>
    </>
  )
}

export default App