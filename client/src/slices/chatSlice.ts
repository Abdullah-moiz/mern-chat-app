import { createSlice } from '@reduxjs/toolkit'
import { chatState } from '../types'



const initialState: chatState = {
    chatSelected: false,
    allUsers: [],
    receiverSelected: null,
    messages: [],
}

export const chatSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setChatSelected: (state, action) => {
            state.chatSelected = action.payload
        },
        setAllUserData: (state, action) => {
            state.allUsers = action.payload
        },
        setReceiverSelected: (state, action) => {
            state.receiverSelected = action.payload
        },
        setMessages: (state, action) => {
            const newMessages = Array.isArray(action.payload) ? action.payload : [action.payload]
            if(newMessages.length === 0){
                state.messages = []
                return
            }else{
                state.messages = [...state.messages, ...newMessages]
            }
        }

    },
})

export const { setChatSelected, setAllUserData, setReceiverSelected, setMessages } = chatSlice.actions
const chatReducer = chatSlice.reducer
export default chatReducer