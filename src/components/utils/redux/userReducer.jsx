import {createSlice} from '@reduxjs/toolkit'

const userSlice=createSlice({
    name:'user',
    initialState:{
        token:'',
        user:null,
        conversation:{}
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
        }
    }
})


export const {setToken,setUser,setMobileConversation} = userSlice.actions
export default userSlice.reducer
