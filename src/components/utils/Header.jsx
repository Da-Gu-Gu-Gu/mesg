import React from 'react'
import './Header.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setLogout } from './redux/userReducer'
import { useNavigate } from 'react-router-dom'

const Header = () => {

  const user=useSelector(state=>state.user.user)
  const dispatch=useDispatch()
  const navigae=useNavigate()

  const Logout=()=>{
    dispatch(setLogout())
    navigae('/')
  }

  return (
    <div className='header'>
      <div className='logo' onClick={Logout}>GUGU CHAT</div>
      <div className='welcome'>
        <div>
        Welcome , {user?user.name.split(' ')[0].toUpperCase():"User"}
        </div> 
        <img src={user?`${user.img.split(' ')[0]}.svg`:"https://api.multiavatar.com/user.svg"} alt="profile" className='profile' />
        </div>
    </div>
  )
}

export default Header