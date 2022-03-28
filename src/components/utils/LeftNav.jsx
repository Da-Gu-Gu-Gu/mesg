import React from 'react'
import FriendList from './FriendList'
import './LeftNav.css'
import Search from './Search'

const LeftNav = () => {
  return (
    <div className='wrap'>
        <Search />
        <FriendList />
    </div>
  )
}

export default LeftNav