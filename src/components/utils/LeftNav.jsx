import React from 'react'
import FriendList from './FriendList'
import './LeftNav.css'
import Search from './Search'


const LeftNav = ({fl,fsearch,fsearchHandler,roomCreate,roomOpen,chatlist}) => {


  
  return (
    <div className='lwrap'>
        <Search id="leftsearch" value={fsearch} handler={fsearchHandler}/>
        <FriendList 
        chatlist={chatlist}
        roomCreate={roomCreate}
        roomOpen={roomOpen}
        fl={fl}  
        search={fsearch}
        />
    </div>
  )
}

export default LeftNav