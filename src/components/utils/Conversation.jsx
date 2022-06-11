import React,{useState,useContext,useEffect} from 'react'
import './Conversation.css'
import {BsFillCameraVideoFill} from 'react-icons/bs'
import {CgProfile} from 'react-icons/cg'
import ChatProfile from './ChatProfile'

import { SocketContext } from './socket/socket'
import Conbo from './Combo'


const Conversation = ({classname,view,roomid,chat,title,roomtype,intro}) => {

 const socket=useContext(SocketContext)

 const [cp,setCp]=useState(false)

 const [arrivalMessage,setArrivalMessage]=useState([])

 const arrivalHandler=(x)=>{
   console.log(x)
   setArrivalMessage([x])
 }

 useEffect(()=>{
  !intro && socket.emit("addRoom",roomid)
 },[roomid,intro,socket])





const open=()=>{
   setCp(false)
  }
  return (
    <div className={classname?classname:'conversation'} style={{display:`${view?'block':'none'}`}}>
      {!intro?
        <>
        <div className='ctitle'>
            <img src={`${title?title[0].img.split(' ')[0]:"https://api.multiavatar.com/user"}.svg`} alt="profile" className='pp' />  
            <div className="fact">
                <p>{title?title[0].name.toUpperCase():"User"}</p>
                <span>{roomtype?"Group":"Personal"}</span>
            </div>
            <div className="function">
               <BsFillCameraVideoFill className='videocall'/>
               <CgProfile className='picon' onClick={()=>setCp(true)} />
            </div>
        </div>
        {cp?
        <ChatProfile data={title} roomtype={roomtype} open={open} />
        :

     
        <Conbo   mesg={chat} newmessage={arrivalMessage} roomid={roomid} arrivalHandler={arrivalHandler}  />
      }
     
        </>
      :
      (
        <div className='intro'>
          <img src="favicon.ico" alt="intro"  className='intro_img'/>
          <p>Let's start the Convseration</p>
          <span>Stay Close</span>
        </div>
      )}
    </div>
  )
}

export default Conversation