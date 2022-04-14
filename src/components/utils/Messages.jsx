import React,{useEffect,createRef,useState,useRef} from 'react'
import './Messages.css'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'timeago.js';
import { setNewMessage } from './redux/userReducer';








const Messages = ({ mesg ,roomid,newmessage}) => {

    const user = useSelector(state => state.user.user)
    const scrollref=createRef(null)
    const [allmesg,setAllmesg]=useState([])

    // const [newmesg,setNewmesg] =useState([])

  
 useEffect(()=>{
     setAllmesg(mesg)
},[mesg])


// useEffect(()=>{
//     setNewMessage()
// })

console.log(newmessage)


useEffect(()=>{
    scrollref?.current.scrollIntoView({
        behavior:'smooth'
    })
},[allmesg,newmessage])
  

    return (
        <div className='mwrap'   >
            <div className='mesg_content'>
            {
                allmesg.map((x) =>
                    user._id !== x.sender._id ?

                        (
                        <div className="otherwrap" key={x._id}>
                        <div className='other' >
                            <img src={`${x.sender.img?.split(' ')[0]}.svg`} alt="op" />
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

{/* socket new message */}
{   
                newmessage[0]?
                newmessage[0][0].roomid===roomid &&
                newmessage.map((x,index) =>
                    user._id !== x[0].sender._id ?

                        (
                        <div className="otherwrap" key={index.toString()}>
                        <div className='other' >
                            <img src={`${x[0].sender.img?.split(' ')[0]}.svg`} alt="op" />
                            <p className="om">
                                {x[0].text}
                            </p>
                            <span >{format(Date.now())}</span>
                        </div>
                        </div>
                        )
                        :
                        (
                            <div className='mewrap'  key={index.toString()}>
                            <div className='me'>
                                <span>{format(Date.now())}</span>
                                <p className="mm">
                                  {x[0].text}
                                </p>
                                <img src={`${x[0].sender.img.split(' ')[0]}.svg`} alt="mp" />
                            </div>
                            </div>
                        )
                ):
                null
                }

                <div  ref={scrollref}/>
                </div>

        </div>
    )
}






export default Messages