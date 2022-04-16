import Header from "../utils/Header";
import React,{useState,useEffect, useRef} from 'react'
import './Dashboard.css'
import LeftNav from "../utils/LeftNav";
import Conversation from "../utils/Conversation";
import RightNav from "../utils/RightNav";
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMobileConversation } from "../utils/redux/userReducer";


const Dashboard = () => {
  const dispatch=useDispatch()
  const token=useSelector(state=>state.user.token)
  const user=useSelector(state=>state.user.user)
  const [message,setMessage]=useState([])
  const [conversation,setConversation]=useState('')
  const [roomtype,setRoomtype] =useState(false)
  const [intro,setIntro]=useState(true)
  const [fsearch,setFsearch]=useState('')
  const [roomId,setRoomId]=useState('')
  const [lview,setLView] =useState(false)
  // const [socket,setSocket]=useState(null)
  const navigate = useNavigate();

  useEffect(()=>{
    let isApiSubscribed = true;
    if(isApiSubscribed){
    if(window.innerWidth>=768){
      setLView(true)
  }else{
      setLView(false)
  }
}
return () => {
  // cancel the subscription
  isApiSubscribed = false;
};
  },[])


 window.addEventListener('resize',()=>{
  if(window.innerWidth>=768){
      setLView(true)
  }else{
      setLView(false)
  }
})

useEffect(()=>{
  let isApiSubscribed = true;
  if (isApiSubscribed) {
  dispatch(setMobileConversation({
    conversation:{
      roomid:roomId,
      intro:intro,
      chat:message,
      roomtype:roomtype,
      title:conversation
    }
  }))
}
return () => {
  // cancel the subscription
  isApiSubscribed = false;
};
},[roomId,message,roomtype,conversation])

  //friend list
  const [fl,setFl]=useState([])
   useEffect(()=>{
    let isApiSubscribed = true;
    axios.get(`${process.env.REACT_APP_SERVER}/user/`,{
           headers:{
               authorization:"Bearer "+token
           }
       }).then(res=>{
         if(isApiSubscribed){
          setFl(res.data.message)
         }
       })
      //  .catch(err=>console.log(err))
       return () => {
        // cancel the subscription
        isApiSubscribed = false;
    };
   }
,[token])

  

  //conversation
  const roomOpen=(id,group,member)=>{

      axios.get(`${process.env.REACT_APP_SERVER}/conversation/${id}`,{
          headers:{
              authorization:'Bearer '+token
          }
      })
      .then((res)=>{
     
          if(!res.data.err){
            setRoomId(id)
            setMessage(res.data)
            setConversation(member)
            setRoomtype(group)
             dispatch(setMobileConversation({
              conversation:{
                roomid:id,
                intro:id?false:true,
                chat:res.data,
                roomtype:group,
                title:member
              }
            }))
            // .then(()=>{ 

              if(window.innerWidth>=768){
                setLView(true)
            }else{
                setLView(false)
            }

            if(!lview){
              console.log('hrr')
              navigate("/conversation",{replace:true});
            }
          // })
        }
      })
  }
 
  //room create
  //personal
  const roomCreate=(x,member)=>{
    let data={
      member:[user._id.toString(),x.toString()]
    }
    let title=[]
    title[0]=member

     axios.post(`${process.env.REACT_APP_SERVER}/room`,
    data,{
      headers:{
        authorization:'Bearer '+token
      }
    })
    .then(res=>{
     console.log(res.data.room)
     setRoomId(res.data.room[0]._id)
     setIntro(false)
     return  roomOpen(res.data.room[0]._id,res.data.room[0].isGroup,title)
  

  })

}

  const introHandler=()=>{
    setIntro(false)
  }

  const fsearchHandler=(x)=>{
    setFsearch(x)
  }


  const [chatlist,setChatlist]=useState([])



  useEffect(()=>{
    let isApiSubscribed = true;

    axios.get(`${process.env.REACT_APP_SERVER}/room/me`,{
      headers:{
        authorization:"Bearer "+token
    }    
    })
    .then(res=>{
      if(isApiSubscribed){
      setChatlist(res.data)
      }
    })

    return()=>{
      isApiSubscribed=false;
    }

  },[token])

 

  return (
        <div className="body">
         
        <Header />
        <div className="dcontent">
            <LeftNav view={lview} fl={fl} chatlist={chatlist} fsearchHandler={fsearchHandler} fsearch={fsearch} roomCreate={roomCreate} roomOpen={roomOpen} />
            <Conversation 
            view={lview}
             roomid={roomId} intro={intro} chat={message} title={conversation} roomtype={roomtype} />
            <RightNav view={lview} room={roomOpen} chatlist={chatlist} intro={introHandler} fl={fl} fsearchHandler={fsearchHandler} fsearch={fsearch} />
        </div>
        </div>
  )
}

export default Dashboard

