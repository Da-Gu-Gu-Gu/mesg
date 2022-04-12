import React,{useEffect,createRef,useState,useRef} from 'react'
import './Messages.css'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'timeago.js';
import { setNewMessage } from './redux/userReducer';








const Messages = ({ mesg ,roomid}) => {

    const user = useSelector(state => state.user.user)
    const newmessage=useSelector(state=>state.user.newmessage)
    const scrollref=createRef(null)
    const [allmesg,setAllmesg]=useState([])
    const dispatch=useDispatch()

    

  
 useEffect(()=>{
     setAllmesg(mesg)
},[mesg])

console.log(newmessage)


useEffect(()=>{
    console.log(newmessage)
   if(newmessage._id){
     if ( newmessage._id==roomid){
        setAllmesg([...mesg,newmessage])
        setNewMessage({newmessage:{}})
     } 
   }
    // setAllmesg([...mesg,newmessage])
},[newmessage])

useEffect(()=>{
    scrollref?.current.scrollIntoView({
        behavior:'smooth'
    })
},[allmesg])
  

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
                <div  ref={scrollref}/>
                </div>

        </div>
    )
}






export default Messages