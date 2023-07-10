import { createSlice } from '@reduxjs/toolkit'
import { userState } from '../types'



const initialState: userState = {
    token : '',
    user : null
}

export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setToken : (state, action) => {
            state.token = action.payload
        },
        setUserData : (state, action) => {
            state.user = action.payload
        },
    },
})

export const { setToken , setUserData } = userSlice.actions
const userReducer = userSlice.reducer
export default userReducer