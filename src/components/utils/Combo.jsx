import React, { useEffect, createRef, useState ,useContext} from 'react'
import './Messages.css'

import { format } from 'timeago.js';

import {useSelector } from 'react-redux'

import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import {FiImage} from 'react-icons/fi'
import './SendMessage.css'
import {MdOutlineEmojiEmotions} from 'react-icons/md'
import axios from 'axios'
import { SocketContext } from './socket/socket'











const Conbo = ({ mesg, roomid, newmessage ,arrivalHandler}) => {


    const socket=useContext(SocketContext)

    const user = useSelector(state => state.user.user)
    const token=useSelector(state=>state.user.token)

    const scrollref = createRef(null)
    const [allmesg, setAllmesg] = useState([])

    const [mesgtext,setMesgtext] = useState('')
    const [bdisable,setbDisable] =useState(true) 
    const [emojiView,setEmojiView]=useState(false)
    const [sendLoad,setSendLoad]=useState(false)

    // useEffect(()=>{
    //     let isApiSubscribed = true;
      
    //     console.log('use')
    //     console.log(newmessage)
    //     if (isApiSubscribed) {
    //     if(newmessage[0]){
    //     newmessage[0].roomid===roomid &&
    //     console.log(roomid)
    //     console.log(newmessage[0].roomid)
    
    //     setAllmesg((prev)=>[...prev,...newmessage])
    
     
    //     }
    // }
    // return () => {
    //     // cancel the subscription
    //     isApiSubscribed = false;
    // };
    // },[newmessage])

//send
   
    useEffect(()=>{
        socket.on(`getMessage${roomid}`,data=>{
          arrivalHandler(data)
          console.log(data)
          data.roomid===roomid && 
          setAllmesg(prev=>[...prev,data])
        })
        
    return () => {
        // before the component is destroyed
        // unbind all event handlers used in this component
        socket.off(`getMessage${roomid}`);
      };
      },[roomid])

      const mesgtextHanlder=(x)=>{
        console.log(x)
        console.log(x==='')
        setMesgtext(x)
        if( x==='' ){
            setbDisable(true)
        }else{
            setbDisable(false) 
            
        }
       
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
          mesgtextHanlder('')
        }
        
      })
      
    }

    const addEmoji = (emoji) => {
        if ("native" in emoji) {
          console.log(emoji)
          setMesgtext(mesgtext+emoji.native)
        }
      };

// messages
    useEffect(() => {
        let isApiSubscribed = true;
        if (isApiSubscribed) {
            setAllmesg(mesg)
        }
        return () => {
            isApiSubscribed = false;
        };
    }, [mesg])

    


    useEffect(() => {
        scrollref?.current.scrollIntoView({
            behavior: 'smooth'
        })
    }, [allmesg])


    return (
        <>
            <div className='mwrap'   >
                <div className='mesg_content'>
                    {
                        allmesg.map((x, index) =>
                            user._id !== x.sender._id ?

                                (
                                    <div className="otherwrap" key={x._id ? x._id : index.toString()}>
                                        <div className='other' >
                                            <img src={`${x.sender.img?.split(' ')[0]}.svg`} alt="op" />
                                            <p className="om">
                                                {x.message ? x.message : x.text}
                                            </p>
                                            <span >{format(x.updatedAt ? x.updatedAt : Date.now())}</span>
                                        </div>
                                    </div>
                                )
                                :
                                (
                                    <div className='mewrap' key={x._id ? x._id : index.toString()}>
                                        <div className='me'>
                                            <span>{format(x.updatedAt ? x.updatedAt : Date.now())}</span>
                                            <p className="mm">
                                                {x.message ? x.message : x.text}
                                            </p>
                                            <img src={`${x.sender.img.split(' ')[0]}.svg`} alt="mp" />
                                        </div>
                                    </div>
                                )
                        )}



                    <div ref={scrollref} />
                </div>

            </div>
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
                        clear='Clear'
                        onSelect={addEmoji}
                        style={{
                            position: 'absolute',
                            bottom: 40,
                            left: '0px',
                            transition: 'all 200ms',
                            transition: 'ease-in'
                        }}
                    />
                }

                <div className='sendwrap'>
                    <FiImage className='gallery' />
                    <MdOutlineEmojiEmotions className='emoji' onClick={() => setEmojiView(!emojiView)} />
                    <input type="text" name="message" value={mesgtext} id="message" className='mesg'
                        placeholder='Aa'

                        onChange={(e) => mesgtextHanlder(e.target.value)}
                    />
                    <button
                        disabled={bdisable || sendLoad}
                        onClick={() => send(roomid)}>
                        {sendLoad ? 'Loading' : 'Send'}
                    </button>
                </div>
            </>
        </>
    )
}






export default Conbo