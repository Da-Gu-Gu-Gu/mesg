import React from 'react'
import {HiOutlineMail} from 'react-icons/hi'
import {MdLockOutline} from 'react-icons/md'
import {CgBoy} from 'react-icons/cg'
import './CustomInput.css'

const CustomInput = (props) => {

const Switch=(x)=>{
  switch(x){
    case "email":
      return <HiOutlineMail />
      break;
    
    case "password":
       return  <MdLockOutline/>
        break;
    case "text":
       return <CgBoy />
        break;
    default:
        break;

  }
}

  return (
    <div className='wrap'>
        <label htmlFor={props.type}>{
          Switch(props.type)
        }</label>
        <input type={props.type} id={props.type}
         placeholder={props.text}/>
    </div>
  )
}

export default CustomInput