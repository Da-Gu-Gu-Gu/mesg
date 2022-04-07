import React,{createRef,useEffect} from 'react'
import './Messages.css'
import { useSelector } from 'react-redux'
import { format } from 'timeago.js';






const Messages = ({ mesg }) => {

    const user = useSelector(state => state.user.user)
    const scrollref=createRef()

    useEffect(()=>{
        scrollref?.current.scrollIntoView({
            behavior:'smooth'
        })
    },[mesg])

    return (
        <div className='mwrap' ref={scrollref} >
            {
                mesg.map((x) =>
                    user._id !== x.sender._id ?
                        (<div className='other' key={x._id}>
                            <img src={`${x.sender.img.split(' ')[0]}.svg`} alt="op" />
                            <p className="om">
                                {x.message}
                            </p>
                            <span >{format(x.updatedAt)}</span>
                        </div>
                        )
                        :
                        (
                            <div className='me' key={x._id}>
                                <span>{format(x.updatedAt)}</span>
                                <p className="mm">
                                  {x.message}
                                </p>
                                <img src={`${x.sender.img.split(' ')[0]}.svg`} alt="mp" />
                            </div>
                        )
                )}
        </div>
    )
}






export default Messages