import React,{useEffect, useState} from 'react'
import Conversation from '../utils/Conversation'
import './MobileConversation.css'
import { useSelector } from 'react-redux'
import Header from '../utils/Header'
import { Link, useNavigate } from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'

const MobileConversation = () => {
    
  const checkConversation=useSelector(state=>state.user.conversation)
   
 
  const navigate=useNavigate()
    console.log(checkConversation)


  const [view,setView] =useState(true)
 
 window.addEventListener('resize',()=>{
  if(window.innerWidth<768){
      setView(true)
  }else{
      setView(false)
      navigate('/')
  }
})

 
    
  return (
    <div className='mobilecon_body' >
      <Header />
      <Link to='/'>
      <BiArrowBack className='icon_back'/>
      </Link>
      <Conversation 
      classname={'mobile_conversation'}
       view={view}
         roomid={checkConversation.roomid} 
         intro={checkConversation.intro}
        chat={checkConversation.chat} 
        title={checkConversation.title}
        roomtype={checkConversation.roomtype}
        />
        
    </div>
  )
}

export default MobileConversation