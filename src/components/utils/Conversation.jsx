import React,{useState} from 'react'
import './Conversation.css'
import {BsFillCameraVideoFill} from 'react-icons/bs'
import {CgProfile} from 'react-icons/cg'
import Messages from './Messages'
import SendMessage from './SendMessage'
import ChatProfile from './ChatProfile'


const Conversation = ({chat,title,roomtype,intro}) => {

 const [cp,setCp]=useState(false)


 
 

const open=()=>{
   setCp(false)
 }
  return (
    <div className='conversation'>
      {!intro?
        <>
        <div className='ctitle'>
            <img src={`${title[0]?title[0].img.split(' ')[0]:"https://api.multiavatar.com/user"}.svg`} alt="profile" className='pp' />  
            <div className="fact">
                <p>{title[0]?title[0].name.toUpperCase():"User"}</p>
                <span>{roomtype?"Group":"Personal"}</span>
            </div>
            <div className="function">
               <BsFillCameraVideoFill className='videocall'/>
               <CgProfile className='picon' onClick={()=>setCp(true)} />
            </div>
        </div>
        {cp?
        <ChatProfile data={title} open={open} />
        :
        <>
          <Messages mesg={chat} />
          <SendMessage />
        </>
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