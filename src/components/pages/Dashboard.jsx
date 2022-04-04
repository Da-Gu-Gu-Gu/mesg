import Header from "../utils/Header";
import React,{useState} from 'react'
import './Dashboard.css'
import LeftNav from "../utils/LeftNav";
import Conversation from "../utils/Conversation";
import RightNav from "../utils/RightNav";
import { useSelector } from 'react-redux'
import axios from 'axios'

const Dashboard = () => {
  const token=useSelector(state=>state.user.token)
  const [message,setMessage]=useState([])
  const [conversation,setConversation]=useState('')
  const [roomtype,setRoomtype] =useState(false)

  const roomOpen=async(id,group,member)=>{
     await axios.get(`${process.env.REACT_APP_SERVER}/conversation/${id}`,{
          headers:{
              authorization:'Bearer '+token
          }
      })
      .then(res=>{
          if(!res.data.err){
            setMessage(res.data)
            setConversation(member)
            setRoomtype(group)
          }
      })
  }
  return (
        <div className="body">
        <Header />
        <div className="dcontent">
            <LeftNav />
            <Conversation chat={message} title={conversation} roomtype={roomtype} />
            <RightNav room={roomOpen}/>
        </div>
        </div>
  )
}

export default Dashboard

