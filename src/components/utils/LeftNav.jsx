import React from 'react'
import FriendList from './FriendList'
import './LeftNav.css'
import Search from './Search'

const LeftNav = () => {
  return (
    <div className='wrap'>
        <Search id="leftsearch" />
        <FriendList />
    </div>
  )
}

export default LeftNav