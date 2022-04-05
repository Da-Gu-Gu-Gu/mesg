import React,{useEffect,useState} from 'react'
import ChatList from './ChatList'
import './RightNav.css'
import {IoCreateOutline} from 'react-icons/io5'
import axios from 'axios'


const RightNav = ({room,intro,fl,fsearch,fsearchHandler,chatlist}) => {
    

  const [group,setGroup]=useState(false)




  return (
    <div className='rightnav'>
        <div className="tabs">
            <p className={`all ${!group && 'underline'}`} onClick={()=>setGroup(false)}>All</p>
            <p className={`gp ${group && 'underline'}`} onClick={()=>setGroup(true)}>Group</p>
        </div> 
        {group && <div><IoCreateOutline className='gp_create' /></div>}
        {chatlist.length > 1 && <p className='cl'>Chat List</p> }
        <div className="chatwrap">
        <ChatList intro={intro} data={chatlist} search={fsearch} group={group} room={room}  fl={fl} fsearchHandler={fsearchHandler} fsearch={fsearch}/>
        </div>
    </div>
  )
}

export default RightNav