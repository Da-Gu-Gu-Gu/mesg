import React from 'react'
import './Messages.css'

const Messages = () => {
  return (
    <div className='mwrap'> 
        <div className='other'>
            <img src="https://api.multiavatar.com/Starcrasher.svg" alt="op" />
            <p className="om">
                Bro ka sout yan chaw tl nw
            </p>
            <span >8:10pm</span>
        </div>
        <div className='me'>
        <span>8:11pm</span>
            <p className="mm">
                Hrr byr ek louk gyi ma hoke pr buu
            </p>
            <img src="https://api.multiavatar.com/1c205c97e6e663ee3e.svg" alt="mp" />
        </div>
    </div>
  )
}

export default Messages