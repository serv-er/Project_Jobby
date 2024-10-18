import React from 'react'
import {ClipLoader} from "react-spinners"


const Spinner = () => {
  return (
   <div style={{
    minHeight:"500px",
    display:"flex",
    jutifyContent:"center",
    alignItems:"center",
   }}
   >
<ClipLoader size={150} />
   </div>
  )
}

export default Spinner