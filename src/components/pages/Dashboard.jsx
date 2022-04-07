import Header from "../utils/Header";
import React,{useState,useEffect} from 'react'
import './Dashboard.css'
import LeftNav from "../utils/LeftNav";
import Conversation from "../utils/Conversation";
import RightNav from "../utils/RightNav";
import { useSelector } from 'react-redux'
import axios from 'axios'

const Dashboard = () => {
  const token=useSelector(state=>state.user.token)
  const user=useSelector(state=>state.user.user)
  const [message,setMessage]=useState([])
  const [conversation,setConversation]=useState('')
  const [roomtype,setRoomtype] =useState(false)
  const [intro,setIntro]=useState(true)
  const [fsearch,setFsearch]=useState('')

  //friend list
  const [fl,setFl]=useState([])
   useEffect(()=>{

    axios.get(`${process.env.REACT_APP_SERVER}/user/`,{
           headers:{
               authorization:"Bearer "+token
           }
       }).then(res=>{
          setFl(res.data.message)
       })
       .catch(err=>console.log(err))
   }
   ,[token])

  

  //conversation
  const roomOpen=async(id,group,member)=>{
    console.log(id)
     await axios.get(`${process.env.REACT_APP_SERVER}/conversation/${id}`,{
          headers:{
              authorization:'Bearer '+token
          }
      })
      .then(res=>{
        console.log(res.data)
          if(!res.data.err){
           
            setMessage(res.data)
            setConversation(member)
            setRoomtype(group)
          }
      })
  }

  //room create
  //personal
  const roomCreate=async(x,member)=>{
    let data={
      member:[user._id.toString(),x.toString()]
    }
    let title=[]
    title[0]=member

    await axios.post(`${process.env.REACT_APP_SERVER}/room`,
    data,{
      headers:{
        authorization:'Bearer '+token
      }
    })
    .then(res=>{
     console.log(res.data.room[0]._id)
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
    axios.get(`${process.env.REACT_APP_SERVER}/room/me`,{
      headers:{
        authorization:"Bearer "+token
    }    
    })
    .then(res=>{
      setChatlist(res.data)
    })
  },[token])

  return (
        <div className="body">
        <Header />
        <div className="dcontent">
            <LeftNav fl={fl} chatlist={chatlist} fsearchHandler={fsearchHandler} fsearch={fsearch} roomCreate={roomCreate} roomOpen={roomOpen} />
            <Conversation intro={intro} chat={message} title={conversation} roomtype={roomtype} />
            <RightNav room={roomOpen} chatlist={chatlist} intro={introHandler} fl={fl} fsearchHandler={fsearchHandler} fsearch={fsearch} />
        </div>
        </div>
  )
}

export default Dashboard

