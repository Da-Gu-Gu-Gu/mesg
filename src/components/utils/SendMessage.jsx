import React,{useState} from 'react'
import {FiImage} from 'react-icons/fi'
import './SendMessage.css'
import {MdOutlineEmojiEmotions} from 'react-icons/md'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Picker from 'emoji-picker-react';

const SendMessage = ({roomid}) => {
  
  const token=useSelector(state=>state.user.token)
  const user=useSelector(state=>state.user.user)

  const [mesgtext,setMesgtext] = useState('')
  const [bdisable,setbDisable] =useState(true) 
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

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
  }).then(res=>{
    console.log(res.data)
  })
  }


  return (
    <>
    {/* <Picker 
    onEmojiClick={onEmojiClick}  
    disableSearchBar={true}
    disableSkinTonePicker={true}
    disableAutoFocus={true}
    pickerStyle={{
      position:'absolute',
      backgroundColor:'transparent',
      border:'none',
      bottom:20,
      left:10,
      scroollbar:'none',
      boxShadow:'none'
    }} /> */}
    <div className='sendwrap'>
        <FiImage className='gallery'/>
         <MdOutlineEmojiEmotions className='emoji'  /> 
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