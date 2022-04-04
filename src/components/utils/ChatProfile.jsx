import React from 'react'
import './ChatProfile.css'
import {BiArrowBack} from 'react-icons/bi'

const ChatProfile = ({data,open}) => {
  return (
    <div className='chat_profile'>
        <BiArrowBack  className='chat_back' onClick={open}/>
        <div className='chat_profile_content' >
        <img src={`${data[0].img?data[0].img.split(' ')[0]:"https://api.multiavatar.com/user"}.svg`} alt="chat_profile" className='chat_profile_img' />
        <p>{data[0].name.toUpperCase()}</p> 
        <a className='chat_profile_link' href={`mailto: ${data[0].email}`}>{data[0].email}</a>
        </div>
    </div>
  )
}

export default ChatProfile