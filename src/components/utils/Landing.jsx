import React from 'react'
import './Landing.css'
import FirebaseApp from './firebase/Firebase'
import { getAuth, signInWithPopup, GoogleAuthProvider, } from 'firebase/auth'
import CustomInput from './CustomInput'
import SiginButton from './SiginButton'
import { FcGoogle } from 'react-icons/fc'

FirebaseApp()

const Landing = () => {

  const auth = getAuth()
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })

  const LoginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(res => { console.log(res) })
  }


  return (
    <div className='landing'>
      <div className='content'>
        <p>Welcome To</p>
        <h2>GUGU CHAT</h2>
        <CustomInput type="email" placeholder="Email" id="emailId" />
        <CustomInput type="password" placeholder="Password" id="passwordId" />
        <SiginButton />
        <span>or Sign in With</span>
        <div className='googleSign' onClick={LoginWithGoogle}>
          <div className='gicon'>
          <FcGoogle />
          </div>
          <div className='gtext'>Sign in with Google</div>
        </div>
        <h6>Don't have an account? <i className='signup'> Sign Up</i></h6>
      </div>
    </div>
  )
}

export default Landing