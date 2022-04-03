import React from 'react'
import './Conversation.css'
import {BsFillCameraVideoFill} from 'react-icons/bs'
import {CgProfile} from 'react-icons/cg'
import Messages from './Messages'
import SendMessage from './SendMessage'
import { useSelector } from 'react-redux'

const Conversation = () => {

  let room=false

  return (
    <div className='conversation'>
      {room?
        <>
        <div className='ctitle'>
            <img src="https://api.multiavatar.com/Starcrasher.svg" alt="profile" className='pp' />  
            <div className="fact">
                <p>Gu Gu Gr Gr</p>
                <span>Online</span>
            </div>
            <div className="function">
               <BsFillCameraVideoFill className='videocall'/>
               <CgProfile className='picon' />
            </div>
        </div>
        <Messages />
        <SendMessage />
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