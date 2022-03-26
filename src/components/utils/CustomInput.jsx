import React from 'react'
import {HiOutlineMail} from 'react-icons/hi'
import {MdLockOutline} from 'react-icons/md'
import './CustomInput.css'
const CustomInput = (props) => {
  return (
    <div className='wrap'>
        <label htmlFor={props.type}>{props.type==="email"?
        <HiOutlineMail />:
        <MdLockOutline/>
        }</label>
        <input type={props.type} id={props.type} placeholder={props.placeholder}/>
    </div>
  )
}

export default CustomInput