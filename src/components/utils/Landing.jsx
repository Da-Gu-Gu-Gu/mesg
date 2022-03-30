import React, { useState } from 'react'
import './Landing.css'
import FirebaseApp from './firebase/Firebase'
import { getAuth, signInWithPopup, GoogleAuthProvider, } from 'firebase/auth'
import CustomInput from './CustomInput'
import SiginButton from './SiginButton'
import { FcGoogle } from 'react-icons/fc'
import { server } from './Domain'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import {FiArrowLeft} from 'react-icons/fi'


FirebaseApp()

const Landing = () => {

  // alert(process.env.REACT_APP_GOOGLE_USER_PWD)

  const [loading, setLoading] = useState(false)
  const [signIn, setSignin] = useState(true)
  const [name, setName] = useState('')
  const [forgotPassword, setForgotpassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const auth = getAuth()
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })
  // res.user.providerData[0].displayName
  const LoginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(res => {
        console.log(res)
        if(signIn){
        axios.post(`${server}/user/signin`, {
          email:res.user.providerData[0].email,
          password:process.env.REACT_APP_GOOGLE_USER_PWD
        }).then(res => {
          console.log(res)
          if (isNaN(res.data.token)) {
            toast(res.data.message, {
              position: toast.POSITION.TOP_RIGHT
            })
          }
      })
    }else{
      axios.post(`${server}/user/`, {
        img:`https://api.multiavatar.com/${res.user.providerData[0].displayName}.png`,
        isVerify:true,
        isGoogle:true,
        name:res.user.providerData[0].displayName,
        email:res.user.providerData[0].email,
        password:process.env.REACT_APP_GOOGLE_USER_PWD
      }).then(res => {
        console.log(res)
        if (isNaN(res.data.token)) {
          toast(res.data.message, {
            position: toast.POSITION.TOP_RIGHT
          })
        }
    })
    }
      })
      .catch(err => console.log(err))
    
  }

  const switchSigUp = (x) => {
    setSignin(!x)
    setLoading(false)
  }

  const signup=()=>{

    if(name.length<5){
      toast("Name must be at least 5 long", {
        position: toast.POSITION.TOP_RIGHT
      })
      return;
    }

    if (email.length < 1) {
      toast("Please Enter Email", {
        position: toast.POSITION.TOP_RIGHT
      })
      return;
    }
    let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!reg.test(email)) {
      toast("Invalid Email", {
        position: toast.POSITION.TOP_RIGHT
      })
      return
    }


    if (password.length < 5) {
      toast("Password must be at least 5 long", {
        position: toast.POSITION.TOP_RIGHT
      })
      return;
    }
    let img=`https://api.multiavatar.com/${name}.png`
    console.log(img)
    setLoading(true)
    axios.post(`${server}/user/`, {
      img,
      name,
      email,
      password
    }).then(res => {
      console.log(res)
      if (isNaN(res.data.token)) {
        toast(res.data.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      }
      setLoading(false)
    })
      .catch(err => console.log(err))

  }


  

  const signin = () => {
    if (email.length < 1) {
      toast("Please Enter Email", {
        position: toast.POSITION.TOP_RIGHT
      })
      return;
    }
    let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!reg.test(email)) {
      toast("Invalid Email", {
        position: toast.POSITION.TOP_RIGHT
      })
      return
    }


    if (password.length < 5) {
      toast("Password must be at least 5 long", {
        position: toast.POSITION.TOP_RIGHT
      })
      return;
    }

    setLoading(true)
    axios.post(`${server}/user/signin`, {
      email,
      password
    }).then(res => {
      console.log(res)
      if (isNaN(res.data.token)) {
        toast(res.data.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      }
      setLoading(false)
    })
      .catch(err => console.log(err))

  }

  const nameHandler=(x)=>{
    setName(x)
  }

  const emailhandler = (x) => {
    setEmail(x)
  }

  const passwordHandler = (x) => {
    setPassword(x)
  }

  return (
    <div className='landing'>
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
      {forgotPassword&&<FiArrowLeft className='back' onClick={()=>setForgotpassword(false)}/>}
        <p className='Fwelcome'> {forgotPassword? "Don't Worry": "Welcome To"}</p>
        <h2 className='Ftitle'>{forgotPassword?"We can bring you back":"GUGU CHAT"}</h2>
        {!forgotPassword?(
        <>
        {!signIn && <CustomInput type="text" text="Name" id="nameId" value={name} change={nameHandler}/>}


        <CustomInput type="email" text="Email" id="emailId" value={email} change={emailhandler} />
        <CustomInput type="password" text="Password" id="passwordId" value={password} change={passwordHandler} />
        <SiginButton func={signIn?signin:signup} load={loading} />
        {signIn ? (
          <span onClick={()=>setForgotpassword(true)}
            className='signup' style={{ textAlign: 'right', width: '100%', display: 'inline-block' }}>
            Forgot Password ?
          </span>
        ) : null
        }
        <span className='inup'>{signIn ? "or Sign in With" : "or Sign up With"}</span>
        <div className='googleSign' onClick={LoginWithGoogle}>
          <div className='gicon'>
            <FcGoogle />
          </div>
          <div className='gtext'>{signIn ? "Sign in with Google" : "Sign up with Google"}</div>
        </div>
        <h6 className='ques'>{signIn ? "Don't have an account?" : "Already have an account?"}</h6><span className='signup' onClick={() => switchSigUp(signIn)}>
          {signIn ? "Sign Up" : "Sign In"}
        </span>
        </>
          ):
         <>
        <CustomInput type="email" text="Email" id="emailId" value={email} change={emailhandler} />
        <SiginButton func={signin} load={loading} />
        </>
         }
      </div>

     
    </div>
  )
}

export default Landing