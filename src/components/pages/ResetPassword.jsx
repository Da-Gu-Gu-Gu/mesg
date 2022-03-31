import React,{useState,useEffect} from 'react'
import axios from 'axios'
import CustomInput from '../utils/CustomInput'
import SiginButton from '../utils/SiginButton'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link, useParams,useNavigate} from 'react-router-dom'
import './ResetPassword.css'

const ResetPassword = () => {

    const navigate=useNavigate()
    const {id,token}=useParams()
    const [pwd,setPwd]=useState('')
    const [rload,setRload]=useState(false)
    const [cpwd,setcPwd]=useState('')

    const pwdhandler=(x)=>{
        setPwd(x)
    }

    const cpwdhandler=(x)=>{
        setcPwd(x)
    }

    useEffect(()=>{
        try {
          axios.put(`${process.env.REACT_APP_SERVER}/user/resetpassword/${id}/${token}`)
          .then(res=>{
            if(res.data.err){
             navigate('/')
              }
          })  
        } catch (error) {
            console.log(error)
        }  
      },[])



    const rp=()=>{
        if (pwd.length < 5 || cpwd.length<5) {
            toast("Password must be at least 5 long", {
              position: toast.POSITION.TOP_RIGHT
            })
            return;
        }
        setRload(true)
        axios.put(`${process.env.REACT_APP_SERVER}/user/resetpassword/${id}/${token}`,{
            "password":pwd,
            "confirmpassword":cpwd
        })
        .then(res=>{
        // if(res.data.err){
        //    navigate('/')
        // }
        console.log(res.data)
        toast(res.data.message, {
            position: toast.POSITION.TOP_RIGHT
          })
          setRload(false)
        })  
        .catch (error=> {
          console.log(error)
      })

    }



  return (
    <div className='resetpassword'>
        <ToastContainer position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    <div className='form'>
        <p className='rp_text'>RESET PASSWORD</p>
        <CustomInput 
        type="password" 
        text="Password" 
        id="pwdId" value={pwd} change={pwdhandler} />

        <CustomInput 
        type="password"
        text="Confirm Password"
        id="confirmPwd"
        value={cpwd}
        change={cpwdhandler}
        />
    
        <SiginButton func={rp} load={rload} />
    </div>
</div>
  )
}

export default ResetPassword    