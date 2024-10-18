import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import {toast} from "react-toastify"
import { clearAllJobErrors, fetchJob } from '../store/slices/jobSlices';
import Spinner from '../components/Spinner';
import {FaSearch} from "react-icons/fa"
import {Link} from "react-router-dom"
import NotFound from './NotFound';

const Jobs = () => {
  const [city,setCity]=useState("");
  const [selectedCity,setSelectedCity]=useState("");
  const [niche,setNiche]=useState("");
  const [selectedNiche,setSelectNiche]=useState("");
  const [searchKeyword,setSearchKeyword]=useState("");

  const {jobs,loading,error}= useSelector((state)=>state.jobs)
  const handleCityChange=(city)=>{
    setCity(city);
    setSelectedCity(city);
  }

  const handleNicheChange=(niche)=>{
    setNiche(niche)
    setSelectNiche(niche)
  }
  

  const dispatch=useDispatch();
  useEffect(()=>{
    if(error){
        toast.error(error)
        dispatch(clearAllJobErrors())
    }
    if (jobs.length ===0){
      toast.info("No Jobs Found")
    }
    dispatch(fetchJob(city,niche, searchKeyword))
  },[dispatch,error,city,niche,searchKeyword,jobs.length])
// [dispatch,error,city,niche] these tells when useEffect runs like when we got an error then runs, or when we got aby city then runs etcz

const handleSearch=()=>{
  dispatch(fetchJob(city,niche,searchKeyword))
}

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

  return (
    <>
    {
      loading ? <Spinner/>:(
        <section className='jobs'>
          <div className="search-tab-wrapper">
            <input type="text" value={searchKeyword} onChange={(e)=>setSearchKeyword(e.target.value)}/>
            <button onClick={handleSearch}>
                     Find job
            </button>
            <FaSearch/>
          </div>
          <div className="wrapper">
            <div className="filter-bar">
              <div className="cities">
                <h2>Filter Job by city</h2>
                {
                  citiesInIndia.map((city,index)=>(
                    <div key={index}>
                    <input type="radio" id={city} name="city" value={city} checked={selectedCity===city} onChange={()=>handleCityChange(city)}/>
                    <label htmlFor={city}>{city}</label>
                  </div>
                  ))
                }
              </div>
              <div className="cities">
                <h2>Filter Job by niche</h2>
                {
                  jobNiches.map((niche,index)=>(
                    <div key={index}>
                      <input type="radio" id={niche} name="niche" value={niche} checked={selectedNiche===niche} onChange={()=>handleNicheChange(niche)}/>
                      <label htmlFor={niche}>{niche}</label>
                    </div>
                  ))
                }
              </div>
            </div>
          <div className="container">
            <div className="mobile-filter">
              <select value={city} onChange={(e)=>setCity(e.target.value)}>
                <option value=""> Filter by City</option>
                {
                  citiesInIndia.map((city,index)=>(
                    <option value={city} key={index}>
                      {city}
                    </option>
                  ))
                }
              </select>
              <select value={niche} onChange={(e)=>setNiche(e.target.value)}>
                <option value=""> Filter by Niche</option>
                {
                  citiesInIndia.map((niche,index)=>(
                    <option value={niche} key={index}>
                      {niche}
                    </option>
                  ))
                }
              </select>
            </div>
            <div className="jobs_container">
              {
                jobs &&  jobs.length>0 ? (jobs.map(element=>{
                  return (
                    <div className="card" key={element._id}>
                      {element.hiringMultipleCandidates==="Yes"?(
                        <p className='hiring-multiple'>
                          Hiring Multiple Candidates
                        </p>
                      ):( <p className='hiring'>
                        Hiring 
                      </p>)}
                      <p className='title'>{element.title}</p>
                      <p className='company'>{element.company}</p>
                      <p className='location'>{element.location}</p>
                      <p className='salary'><span>
                        Salary:
                        </span>{element.salary}</p>
                      <p className='posted'><span>
                        Posted On:
                        </span> {element.jobPostedOn}</p>
                        <div className="btn-wrapper">
                             <Link className="btn" to={`/post/application/${element._id}`}>Apply Now</Link>
                        </div>
                    </div>
                  )
                })
              ):(<NotFound/>)}
            </div>
          </div>
          </div>
        </section>
      )
    }
    </>
  )
}

export default Jobs