import React,{useEffect,useState} from 'react'
import './FriendList.css'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { async } from '@firebase/util'

const FriendList = () => {

    const token=useSelector(state=>state.user.token)

   const [fl,setFl]=useState([])
    useEffect(()=>{

        axios.get(`${process.env.REACT_APP_SERVER}/user/`,{
            headers:{
                authorization:"Bearer "+token
            }
        }).then(res=>{
            console.log(res)
           setFl(res.data.message)
        })
        .catch(err=>console.log(err))
    }
    ,[])

  return (
    <div>
        <p className='title'>FriendList</p>
         
         {fl.map(x=>
        <div className="fl" id={x._id}>
            <div className='avatar'>
            <img src={x.img?x.img:"https://api.multiavatar.com/Starcrasher.svg"}  alt="avatar" />
            <div className='status'></div>
            </div>
            <div className="desc">
                <p className='name'>{x.name?x.name:"User Name"}</p>
                <span className='msg'>Say Hi ,to your friend !</span>
            </div>
            <div >
               <span className="time">8:30 pm</span> 
            </div>
        </div>
         )}

    </div>
  )
}

export default FriendList