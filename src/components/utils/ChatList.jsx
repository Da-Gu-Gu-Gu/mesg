import React from 'react'
import './ChatList.css'
import { useSelector } from 'react-redux'
import Search from './Search'
import FriendList from './FriendList'



const ChatList = ({ data ,group,search , view,room,intro ,fl,fsearch,fsearchHandler}) => {

    const user=useSelector(state=>state.user.user)
   
    // const redirect=()=>{
    //     navigate('/conversation')
    // }

    return (
        <div>
            {data.length < 1 ?
            <>
            <Search id="rightsearch" value={fsearch} handler={fsearchHandler} />
            <FriendList   fl={fl}  search={fsearch}  chatlist={data}/>
            </>
                
                :
                data
                ?.filter(x=>group?x.isGroup===group:x)
                .filter(y=>
                    y.member.filter(a=>{
                    if(a._id!==user._id){
                         y.name=a.name
                    }
                })
                )
                .filter(z=>{
                if (search === '') return z
                if (z.name.toLowerCase().includes(search.toLowerCase())) {
                  return z
                }
            })
                .map(x=>(
                <div className="fl" key={x._id} onClick={()=>{
                    intro()
                    room(x._id,x.isGroup,x.member.filter(x=>x._id!==user._id))
                   
                }
                    }>
                    <div className='avatar'>
                        <img src={`${x.member.filter(x=>x._id!==user._id)[0]?.img.split(' ')[0]}.svg`} alt="avatar" />
                        <div className='status'></div>
                    </div>
                    <div className="desc">
                        <p className='name'>{x.member.filter(x=>x._id!==user._id)[0]?.name.toUpperCase()}</p>
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