import React from 'react'
import { Colors } from './Colors'
// import 'SigninButton.css'
const SiginButton = (props) => {
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
           }}
          
        onClick={props.func}
        disabled={props.load}
          >
        {props.load?'Loading...':'Continue'} 
    </button>
  )
}

export default SiginButton