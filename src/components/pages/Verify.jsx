import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'
import './Verify.css'

const Verify = () => {
    const {id,token}=useParams()
    const [msg,setMsg]=useState('')

    useEffect(()=>{
      try {
        axios.put(`${process.env.REACT_APP_SERVER}/user/verify/${id}/${token}`)
        .then(res=>{
            console.log(res.data)
            setMsg(res.data.message)
        })  
      } catch (error) {
          console.log(error)
      }  
    },[])

  return (
    <div className='verify'>
        <div className='vmesg'>
        {msg}
        </div> 
        <Link to="/" style={{textDecoration:'none'}}>
            <div className="goback">
            Go Back to Login
            </div>
        </Link>
    </div>
  )
}

export default Verify