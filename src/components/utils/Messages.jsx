import React,{useEffect,createRef,useState,useRef} from 'react'
import './Messages.css'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'timeago.js';
import { setNewMessage } from './redux/userReducer';








const Messages = ({ mesg ,roomid,newmessage}) => {

    const user = useSelector(state => state.user.user)
    const arrivalMesg=useSelector(state=>state.user.newmessage)
    const scrollref=createRef(null)
    const [allmesg,setAllmesg]=useState([])
    const dispatch=useDispatch()

    // const [newmesg,setNewmesg] =useState([])

  
 useEffect(()=>{
    let isApiSubscribed = true;
    if (isApiSubscribed) {
     setAllmesg(mesg)
    }
    return () => {
        // cancel the subscription
        isApiSubscribed = false;
    };
},[mesg])


useEffect(()=>{
    let isApiSubscribed = true;
    //room id sit 
    if (isApiSubscribed) {
    if(newmessage[0]){
    newmessage[0].roomid===roomid &&
    console.log(roomid)
    console.log(newmessage[0].roomid)
    setAllmesg((prev)=>[...prev,...newmessage])
    dispatch(setNewMessage({
        newmessage:[]
    }))
    }
}
return () => {
    // cancel the subscription
    isApiSubscribed = false;
};
},[newmessage,roomid])

console.log(newmessage)


useEffect(()=>{
    scrollref?.current.scrollIntoView({
        behavior:'smooth'
    })
},[allmesg])
  

    return (
        <div className='mwrap'   >
            <div className='mesg_content'>
            {
                allmesg.map((x,index) =>
                    user._id !== x.sender._id ?

                        (
                        <div className="otherwrap" key={x._id?x._id:index.toString()}>
                        <div className='other' >
                            <img src={`${x.sender.img?.split(' ')[0]}.svg`} alt="op" />
                            <p className="om">
                                {x.message?x.message:x.text}
                            </p>
                            <span >{format(x.updatedAt?x.updatedAt:Date.now())}</span>
                        </div>
                        </div>
                        )
                        :
                        (
                            <div className='mewrap'  key={x._id?x._id:index.toString()}>
                            <div className='me'>
                                <span>{format(x.updatedAt?x.updatedAt:Date.now())}</span>
                                <p className="mm">
                                {x.message?x.message:x.text}
                                </p>
                                <img src={`${x.sender.img.split(' ')[0]}.svg`} alt="mp" />
                            </div>
                            </div>
                        )
                )}

{/* socket new message */}
{/* {   
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
                } */}

                <div  ref={scrollref}/>
                </div>

        </div>
    )
}






export default Messages