import { createSlice } from '@reduxjs/toolkit'
import { chatState } from '../types'



const initialState: chatState = {
    typing: false,
    typerID : {
        senderId : '',
        receiverId : ''
    },
    userMessageLoading: false,
    chatSelected: '',
    allUsers: [],
    receiverSelected: null,
    messages: [],
    searchUsers : [],
    allGroups : [],
    groupSelected : null,

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
        setAllGroups: (state, action) => {
            state.allGroups = action.payload
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
        },
        setSearchUser : (state, action) => {
            state.searchUsers = action.payload
        },
        setGroupSelected : (state, action) => {
            state.groupSelected = action.payload
        },
        setUserMessageLoading: (state, action) => {
            state.userMessageLoading = action.payload
        },
        setTyping: (state, action) => {
            state.typing = action.payload
        },
        setTyperID: (state, action) => {
            state.typerID = action.payload
        }
        




    },
})

export const { 
    setChatSelected, setAllUserData, setReceiverSelected,setUserMessageLoading,
     setMessages  , setSearchUser , setAllGroups , setGroupSelected ,setTyping,
     setTyperID
} = chatSlice.actions
const chatReducer = chatSlice.reducer
export default chatReducer