import React from 'react'
import ChatList from './ChatList'
import './RightNav.css'
import Search from './Search'

const RightNav = () => {
  return (
    <div className='rightnav'>
        <div className="tabs">
            <p className='all'>All</p>
            <p className='gp'>Group</p>
        </div>
        <Search id="rightsearch" />
        <p className='cl'>Chat List</p>
        <div className="chatwrap">
        <ChatList />
        </div>
    </div>
  )
}

export default RightNav