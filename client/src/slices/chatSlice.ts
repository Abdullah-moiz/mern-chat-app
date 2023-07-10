import { createSlice } from '@reduxjs/toolkit'
import { chatState } from '../types'



const initialState: chatState = {
    chatSelected : false
}

export const chatSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setChatSelected : (state, action) => {
            state.chatSelected = action.payload
        },
        
    },
})

export const { setChatSelected } = chatSlice.actions
const chatReducer = chatSlice.reducer
export default chatReducer