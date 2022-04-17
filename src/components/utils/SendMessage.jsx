import React,{useState,useContext,useEffect} from 'react'
import {FiImage} from 'react-icons/fi'
import './SendMessage.css'
import {MdOutlineEmojiEmotions} from 'react-icons/md'
import axios from 'axios'
import { useSelector } from 'react-redux'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { SocketContext } from './socket/socket'

 
const SendMessage = ({roomid,arrivalHandler}) => {

  const socket=useContext(SocketContext)
  
  const token=useSelector(state=>state.user.token)
  const user=useSelector(state=>state.user.user)


  const [mesgtext,setMesgtext] = useState('')
  const [bdisable,setbDisable] =useState(true) 
  const [emojiView,setEmojiView]=useState(false)
 const [mesend,setMesend]=useState(false)
 const [sendLoad,setSendLoad]=useState(false)

 
 useEffect(()=>{
  socket.on(`getMessage${roomid}`,data=>{
    arrivalHandler(data)
  })
},[])
 
  const mesgtextHanlder=(x)=>{
    console.log(x)
    console.log(x.length)
   if( x.length >1 ){
      setbDisable(false) 
      setMesgtext(x)
   }else{
    setbDisable(true) 
     setMesgtext(x)
   }
   
  alert(mesgtext)
  }


  const send=(id)=>{
    setSendLoad(true)
     axios.post(`${process.env.REACT_APP_SERVER}/conversation/${id}`,{
      message:mesgtext,
      sender:user._id
    },
    {
    headers:{
      authorization:'Bearer '+token
    }
  }).then((res)=>{
    if(res.data.message){
      socket.emit('sendMessage',{
        roomid:roomid,
        sender:user,
        text:mesgtext,
      })
      setSendLoad(false)
      setMesgtext('')
    }
    setMesend(true)
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
  <p style={{background:'white'}}>{bdisable}</p>
   <p>{mesgtext} fasdfj ;k dsf;k</p>
    <div className='sendwrap'>
  
    <FiImage className='gallery'/>
         <MdOutlineEmojiEmotions className='emoji'  onClick={()=>setEmojiView(!emojiView)}/> 
         
        <input type="text" name="message" value={mesgtext} id="message" className='mesg' 
            placeholder='Aa'
           
            onChange={(e)=>mesgtextHanlder(e.target.value)}
        />
        
        <button
         disabled={bdisable} 
         onClick={()=>bdisable?null:send(roomid)}>
           {sendLoad ? 'Loading' : 'Send'} 
        </button>
    </div>
    </>

  )
}

export default SendMessage