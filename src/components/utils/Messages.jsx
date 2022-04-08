import React,{useEffect,createRef} from 'react'
import './Messages.css'
import { useSelector } from 'react-redux'
import { format } from 'timeago.js';






const Messages = ({ mesg }) => {

    const user = useSelector(state => state.user.user)
    const scrollref=createRef(null)
  
 useEffect(()=>{
  scrollref?.current.scrollIntoView({
      behavior:'smooth'
  })
},[mesg])
  

    return (
        <div className='mwrap'   >
            <div className='mesg_content'>
            {
                mesg.map((x) =>
                    user._id !== x.sender._id ?

                        (
                        <div className="otherwrap" key={x._id}>
                        <div className='other' >
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
                            <div className='mewrap'  key={x._id}>
                            <div className='me'>
                                <span>{format(x.updatedAt)}</span>
                                <p className="mm">
                                  {x.message}
                                </p>
                                <img src={`${x.sender.img.split(' ')[0]}.svg`} alt="mp" />
                            </div>
                            </div>
                        )
                )}
                <div  ref={scrollref}/>
                </div>

        </div>
    )
}






export default Messages