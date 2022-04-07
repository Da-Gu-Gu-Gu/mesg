import React,{useEffect,useState} from 'react'
import ChatList from './ChatList'
import './RightNav.css'
import {IoCreateOutline} from 'react-icons/io5'
import Search from './Search'


const RightNav = ({room,intro,fl,fsearch,fsearchHandler,chatlist}) => {
    
  const [csearch,setCsearch]=useState('')
  const [group,setGroup]=useState(false)

const csearchHandler=(x)=>{
  setCsearch(x)
}


  return (
    <div className='rightnav'>
        <div className="tabs">
            <p className={`all ${!group && 'underline'}`} onClick={()=>setGroup(false)}>All</p>
            <p className={`gp ${group && 'underline'}`} onClick={()=>setGroup(true)}>Group</p>
        </div> 
        {group && <div><IoCreateOutline className='gp_create' /></div>}
        {(chatlist.length > 0 && !group) &&   <Search id="rightsearch" value={csearch} handler={csearchHandler} /> }
        {chatlist.length > 0 && <p className='cl'>Chat List</p> }
       
        <div className="chatwrap">
        <ChatList intro={intro} data={chatlist} search={csearch} group={group} room={room}  fl={fl} fsearchHandler={fsearchHandler} fsearch={fsearch}/>
        </div>
    </div>
  )
}

export default RightNav