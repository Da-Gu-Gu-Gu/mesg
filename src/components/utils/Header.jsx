import React,{useState} from 'react'
import './Header.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setLogout } from './redux/userReducer'
import { useNavigate } from 'react-router-dom'
import { AiFillCaretDown } from 'react-icons/ai'
import {HiLogout} from 'react-icons/hi'
 
const Header = () => {

  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const navigae = useNavigate()

  const [dropdown,setDropdown] = useState(false)

  const Logout = () => {
    dispatch(setLogout())
    navigae('/')
  }

  return (
    <>
    <div className='header'>
      <div className='logo' >GUGU CHAT</div>
      <div className='welcome'>

        <div onClick={()=>setDropdown(!dropdown)} className="gg">
          <img src={user ? `${user.img.split(' ')[0]}.svg` : "https://api.multiavatar.com/user.svg"} alt="profile" className='profile' />
          <AiFillCaretDown className='dropdown' />
        </div>
      </div>


    </div>
    {dropdown && 
    <div className='dropdown_menu'>
    <ul >
        <li onClick={Logout}>
        <HiLogout />
          <p>  Logout</p>
        </li>
      
      </ul>
  </div>
}

  </>
  )
}

export default Header