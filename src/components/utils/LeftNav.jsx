import React,{useState,useEffect} from 'react'
import FriendList from './FriendList'
import './LeftNav.css'
import Search from './Search'
import { useSelector } from 'react-redux'
import axios from 'axios'

const LeftNav = () => {
  const token=useSelector(state=>state.user.token)

  const [fl,setFl]=useState([])
   useEffect(()=>{

       axios.get(`${process.env.REACT_APP_SERVER}/user/`,{
           headers:{
               authorization:"Bearer "+token
           }
       }).then(res=>{
          setFl(res.data.message)
       })
       .catch(err=>console.log(err))
   }
   ,[token])
  return (
    <div className='lwrap'>
        <Search id="leftsearch" />
        <FriendList fl={fl} />
    </div>
  )
}

export default LeftNav