import React from 'react'
import './FriendList.css'



const FriendList = ({fl}) => {



  return (
    <div>
        <p className='title'>FriendList</p>
        {fl.length < 1 ?
                <p style={{textAlign:'center',color:'gray'}}>There is no user</p>
                :
         fl.map(x=>
            (
            <div className="fl" key={x._id}>
            <div className='avatar'>
            <img  alt="avatar" src={x.img?`${x.img.split(' ')[0]}.svg`:"https://api.multiavatar.com/user.svg"}/>
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
            )
        )}

    </div>
  )
}

export default FriendList