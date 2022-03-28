import React,{useState} from 'react'
import './Landing.css'
import FirebaseApp from './firebase/Firebase'
import { getAuth, signInWithPopup, GoogleAuthProvider, } from 'firebase/auth'
import CustomInput from './CustomInput'
import SiginButton from './SiginButton'
import { FcGoogle } from 'react-icons/fc'

FirebaseApp()

const Landing = () => {

  const [signIn,setSignin]=useState(true)

  const auth = getAuth()
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })
  // res.user.providerData[0].displayName
  const LoginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(res => { 
        console.log(res)
       })
      .catch(err=>console.log(err))
  }

  const switchSigUp=(x)=>{setSignin(!x)}


  return (
    <div className='landing'>
      <div className='content'>
        <p>Welcome To</p>
        <h2>GUGU CHAT</h2>
        {!signIn && <CustomInput type="text" text="Name" id="nameId" /> }


        <CustomInput type="email" text="Email" id="emailId" />
        <CustomInput type="password" text="Password" id="passwordId" />
        <SiginButton />
        {signIn && <span className='signup' style={{textAlign:'right',width:'100%',display:'inline-block'}}>Forgot Password ?</span>}
        <span>{signIn?"or Sign in With":"or Sign up With"}</span>
        <div className='googleSign' onClick={LoginWithGoogle}>
          <div className='gicon'>
          <FcGoogle />
          </div>
          <div className='gtext'>{signIn?"Sign in with Google":"Sign up with Google"}</div>
        </div>
        <h6>{signIn?"Don't have an account?":"Already have an account?"}</h6><span className='signup' onClick={()=>switchSigUp(signIn)}>
          {signIn?"Sign Up":"Sign In"}
           </span>
      </div>
    </div>
  )
}

export default Landing