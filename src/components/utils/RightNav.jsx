import React,{useEffect,useState} from 'react'
import ChatList from './ChatList'
import './RightNav.css'
import Search from './Search'
import {IoCreateOutline} from 'react-icons/io5'
import axios from 'axios'
import { useSelector } from 'react-redux'

const RightNav = () => {
    
  const token=useSelector(state=>state.user.token)
  const [chatlist,setChatlist]=useState([])
  const [group,setGroup]=useState(false)
  const [searchcl,setSearchcl]=useState('')

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_SERVER}/room/me`,{
      headers:{
        authorization:"Bearer "+token
    }    
    })
    .then(res=>{
      setChatlist(res.data)
    })
  },[token])


  const searchHandler=(x)=>{
    setSearchcl(x)
  }

  return (
    <div className='rightnav'>
        <div className="tabs">
            <p className={`all ${!group && 'underline'}`} onClick={()=>setGroup(false)}>All</p>
            <p className={`gp ${group && 'underline'}`} onClick={()=>setGroup(true)}>Group</p>
        </div> 
        {group && <div><IoCreateOutline className='gp_create' /></div>}
        {!group && <Search id="rightsearch" value={searchcl} func={searchHandler} />}
        <p className='cl'>Chat List</p>
        <div className="chatwrap">
        <ChatList data={chatlist} search={searchcl} group={group}/>
        </div>
    </div>
  )
}

export default RightNav