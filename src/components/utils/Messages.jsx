import React from 'react'
import './Messages.css'
import { useSelector } from 'react-redux'
import { format } from 'timeago.js';






const Messages = ({ mesg }) => {

    const user = useSelector(state => state.user.user)
  

  

    return (
        <div className='mwrap'   >
            {
                mesg.map((x) =>
                    user._id !== x.sender._id ?

                        (
                        <div className="otherwrap">
                        <div className='other' key={x._id}>
                            <img src={`${x.sender.img.split(' ')[0]}.svg`} alt="op" />
                            <p className="om">
                                {x.message}
                            </p>
                            <span >{format(x.updatedAt)}</span>
                        </div>
                        </div>
                        )
                        :
                        (
                            <div className='mewrap'>
                            <div className='me' key={x._id}>
                                <span>{format(x.updatedAt)}</span>
                                <p className="mm">
                                  {x.message}
                                </p>
                                <img src={`${x.sender.img.split(' ')[0]}.svg`} alt="mp" />
                            </div>
                            </div>
                        )
                )}
        </div>
    )
}






export default Messages