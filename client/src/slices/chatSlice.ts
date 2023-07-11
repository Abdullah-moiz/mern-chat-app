import { createSlice } from '@reduxjs/toolkit'
import { chatState } from '../types'



const initialState: chatState = {
    chatSelected : false,
    allUsers : [],
    receiverSelected : null ,
}

export const chatSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setChatSelected : (state, action) => {
            state.chatSelected = action.payload
        },
        setAllUserData : (state, action) => {
            state.allUsers = action.payload
        },
        setReceiverSelected : (state, action) => {
            state.receiverSelected = action.payload
        },
        
    },
})

export const { setChatSelected , setAllUserData , setReceiverSelected } = chatSlice.actions
const chatReducer = chatSlice.reducer
export default chatReducer