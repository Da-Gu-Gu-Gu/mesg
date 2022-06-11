import React from 'react'
import {HiOutlineMail} from 'react-icons/hi'
import {MdLockOutline} from 'react-icons/md'
import {CgBoy} from 'react-icons/cg'
import {MdOutlineGppGood} from 'react-icons/md'
import './CustomInput.css'

const CustomInput = (props) => {

const Switch=(x)=>{
  switch(x){
    case "Email":
      return <HiOutlineMail />
    
    
    case "Password":
       return  <MdLockOutline/>
      
    case "Name":
       return <CgBoy />
      
    case "Confirm Password":
      return  <MdOutlineGppGood />
    
    default:
        break;

  }
}

  return (
    <div className='wrap'>
        <label htmlFor={props.text}>{
          Switch(props.text)
        }</label>
        <input type={props.type} id={props.text}
         placeholder={props.text}
         value={props.value}
         onChange={(event)=>props.change(event.target.value)}
         />
    </div>
  )
}

export default CustomInput