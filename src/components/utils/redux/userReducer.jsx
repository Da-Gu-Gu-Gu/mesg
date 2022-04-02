import {createSlice} from '@reduxjs/toolkit'

const userSlice=createSlice({
    name:'user',
    initialState:{
        token:'',
        user:null,
    },
    reducers:{
        setToken:(state,action)=>{
            state.token=action.payload.token
        },
        setUser:(state,action)=>{
            state.user=action.payload.user
        }
    }
})


export const {setToken,setUser} = userSlice.actions
export default userSlice.reducer
