import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
      <div className='logo'>GUGU CHAT</div>
      <div className='welcome'>
        <div>
        Welcome , Hein
        </div> 
        <img src="https://api.multiavatar.com/Starcrasher.png" alt="profile" className='profile' />
        </div>
    </div>
  )
}

export default Header