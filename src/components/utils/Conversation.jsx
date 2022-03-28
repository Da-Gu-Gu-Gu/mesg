import React from 'react'
import './Conversation.css'
import {BsFillCameraVideoFill} from 'react-icons/bs'
import {CgProfile} from 'react-icons/cg'
import Messages from './Messages'
import SendMessage from './SendMessage'

const Conversation = () => {
  return (
    <div className='conversation'>
        <div className='ctitle'>
            <img src="https://api.multiavatar.com/Starcrasher.svg" alt="profile" className='pp' />  
            <div className="fact">
                <p>Hein Htet Aung</p>
                <span>Online</span>
            </div>
            <div className="function">
               <BsFillCameraVideoFill className='videocall'/>
               <CgProfile className='picon' />
            </div>
        </div>
        <Messages />
        <SendMessage />
    </div>
  )
}

export default Conversation