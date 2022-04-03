import React from 'react'
import './ChatList.css'
import { useSelector } from 'react-redux'
const ChatList = ({ data ,group,search}) => {

    const user=useSelector(state=>state.user.user)

    return (
        <div>
            {data.filter(x=>group?x.isGroup===group:x).length < 1 ?
                <p style={{textAlign:'center',color:'gray'}}>There is no Room</p>
                :
                data
                .filter(x=>group?x.isGroup===group:x)
                // .filter(y=>{
                //     if(search==='') return y
                //     if(y.name.toLowerCase().includes(search.toLowerCase())){
                //         return y
                //     }
                // })
                .map(x=>(
                <div className="fl" key={x._id}>
                    <div className='avatar'>
                        <img src={`${x.member.filter(x=>x._id!=user._id)[0].img.split(' ')[0]}.svg`} alt="avatar" />
                        <div className='status'></div>
                    </div>
                    <div className="desc">
                        <p className='name'>{x.member.filter(x=>x._id!=user._id)[0].name.toUpperCase()}</p>
                        <span className='msg'>Say Hi ,to your friend !</span>
                    </div>
                    <div >
                        <span className="time">8:30 pm</span>
                    </div>
                </div>
                ))
        }

        </div>

    )
}

export default ChatList