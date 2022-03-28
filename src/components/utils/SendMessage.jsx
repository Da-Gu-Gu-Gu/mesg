import React from 'react'
import {FiImage} from 'react-icons/fi'
import './SendMessage.css'
import {MdOutlineEmojiEmotions} from 'react-icons/md'

const SendMessage = () => {
  return (
    <div className='sendwrap'>
        <FiImage className='gallery'/>
        <MdOutlineEmojiEmotions className='emoji' />
        <input type="text" name="message" id="message" className='mesg' 
            placeholder='Aa'
        />
        <button>
            Send
        </button>
    </div>
  )
}

export default SendMessage