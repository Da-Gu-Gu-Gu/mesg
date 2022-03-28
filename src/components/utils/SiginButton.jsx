import React from 'react'
import { Colors } from './Colors'
// import 'SigninButton.css'
const SiginButton = () => {
  return (
    <button style={{
        backgroundColor:Colors.primary,
        height:'35px',
        width:'100%',
        marginTop:10,
        borderRadius:10,
        border:'none',
        fontSize:'bold',
        color:'white' ,
        cursor:'pointer',
           }}>
        Continue
    </button>
  )
}

export default SiginButton