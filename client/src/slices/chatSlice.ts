import { createSlice } from '@reduxjs/toolkit'
import { chatState } from '../types'



const initialState: chatState = {
    chatSelected : false,
    allUsers : [],

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
        }

        
    },
})

export const { setChatSelected , setAllUserData } = chatSlice.actions
const chatReducer = chatSlice.reducer
export default chatReducer