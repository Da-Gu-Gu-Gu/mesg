import React,{useState,useEffect} from 'react'
import FriendList from './FriendList'
import './LeftNav.css'
import Search from './Search'
import { useSelector } from 'react-redux'
import axios from 'axios'

const LeftNav = () => {
  const token=useSelector(state=>state.user.token)
  const [fsearch,setFsearch]=useState('')

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

   const fsearchHandler=(x)=>{
     setFsearch(x)
   }
  
  return (
    <div className='lwrap'>
        <Search id="leftsearch" value={fsearch} handler={fsearchHandler}/>
        <FriendList 
        fl={fl}  
        search={fsearch}
        />
    </div>
  )
}

export default LeftNav