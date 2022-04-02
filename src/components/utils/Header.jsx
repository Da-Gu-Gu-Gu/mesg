import React from 'react'
import './Header.css'
import { useSelector } from 'react-redux'

const Header = () => {

  const user=useSelector(state=>state.user.user)

  return (
    <div className='header'>
      <div className='logo'>GUGU CHAT</div>
      <div className='welcome'>
        <div>
        Welcome , {user?user.name.split(' ')[0].toUpperCase():"User"}
        </div> 
        <img src={user?user.img:"https://api.multiavatar.com/Starcrasher.svg"} alt="profile" className='profile' />
        </div>
    </div>
  )
}

export default Header