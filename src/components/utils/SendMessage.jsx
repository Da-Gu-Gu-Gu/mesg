import React,{useState,useEffect,useRef} from 'react'
import {FiImage} from 'react-icons/fi'
import './SendMessage.css'
import {MdOutlineEmojiEmotions} from 'react-icons/md'
import axios from 'axios'
import { useSelector } from 'react-redux'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import {io} from 'socket.io-client'
import { useDispatch } from 'react-redux'
import { setNewMessage } from './redux/userReducer'

 
const SendMessage = ({roomid,receiver,arrival}) => {
  
  const token=useSelector(state=>state.user.token)
  const user=useSelector(state=>state.user.user)
  const dispatch=useDispatch()

  const socket=useRef(io(`ws://localhost:5000`))

  let RoomID=roomid
// console.log(room)
  
useEffect(()=>{
  socket.current=io("ws://localhost:5000")
  socket.current.emit("addRoom",roomid)
  socket.current.on("getRooms",rooms=>{
    console.log(rooms)
  })
  console.log(socket)
},[])


 


  const [mesgtext,setMesgtext] = useState('')
  const [bdisable,setbDisable] =useState(true) 
  const [emojiView,setEmojiView]=useState(false)
 const [mesend,setMesend]=useState(false)
 

  
  

 
 
  const mesgtextHanlder=(x)=>{
   if( x.length >0 ){
      setbDisable(false) 
      setMesgtext(x)
   }else{
     setMesgtext(x)
   }
  }

  const send=async(id)=>{
    await axios.post(`${process.env.REACT_APP_SERVER}/conversation/${id}`,{
      message:mesgtext,
      sender:user._id
    },
    {
    headers:{
      authorization:'Bearer '+token
    }
  }).then(async(res)=>{
    console.log(receiver[0])
    if(res.data.message){
      socket.current.emit('sendMessage',{
        roomid:roomid,
        sender:user,
        text:mesgtext,
      })
    }
    setMesend(true)
    socket.current.on(`getMessage${roomid}`,data=>{
      console.log(data)
      arrival([data])
    })
  })
  
}


  const addEmoji = (emoji) => {
    if ("native" in emoji) {
      console.log(emoji)
      setMesgtext(mesgtext+emoji.native)
    }
  };

  return (
    <>
   
  {emojiView &&
    <Picker 
   set='google'  
   emoji='point_up'
   tooltip={false}
   showSkinTones={false}
   theme='dark'
   showPreview={false}
   emojiTooltip={false}
   title=""
   clear= 'Clear'
   onSelect={addEmoji}
   style={{
     position:'absolute',
      bottom:40,
     left:'0px',
     transition:'all 200ms',
     transition:'ease-in'
   }}
   />
  }

    <div className='sendwrap'>
    <FiImage className='gallery'/>
         <MdOutlineEmojiEmotions className='emoji'  onClick={()=>setEmojiView(!emojiView)}/> 
        <input type="text" name="message" value={mesgtext} id="message" className='mesg' 
            placeholder='Aa'
           
            onChange={(e)=>mesgtextHanlder(e.target.value)}
        />
        <button
         disabled={bdisable} 
         onClick={()=>send(roomid)}>
            Send
        </button>
    </div>
    </>

  )
}

export default SendMessage