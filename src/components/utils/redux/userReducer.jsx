import {createSlice} from '@reduxjs/toolkit'

const userSlice=createSlice({
    name:'user',
    initialState:{
        token:'',
        user:null,
        conversation:{},
        newmessage:[]
    },
    reducers:{
        setToken:(state,action)=>{
            state.token=action.payload.token
        },
        setUser:(state,action)=>{
            state.user=action.payload.user
        },
        setMobileConversation:(state,action)=>{
            state.conversation=action.payload.conversation
        },
        setNewMessage:(state,action)=>{
            state.newmessage=action.payload.newmessage
        },
        setLogout:(state,action)=>{
            state.token=''
           state.user=null
            state.conversation={}
            state.newmessage=[]
        }
    }
})


export const {setLogout,setToken,setUser,setMobileConversation,setNewMessage} = userSlice.actions
export default userSlice.reducer
