import React from 'react'
import { useDispatch } from 'react-redux'
import { setChatSelected, setReceiverSelected } from '../slices/chatSlice'
import { userData } from '../types'


export default function ConversationCard({_id , name , email } : userData) {
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(setChatSelected(true))
        dispatch(setReceiverSelected({_id, name, email}))
    }


    return (
        <div onClick={handleClick} className='w-11/12  h-20 bg-slate-800 my-2 flex items-center cursor-pointer rounded-2xl px-4 mx-4 hover:bg-slate-700 text-white justify-start  transition-all duration-700'>
            <div className="avatar mx-4 placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                    <span className="text-xs">{name.substring(0,2)}</span>
                </div>
            </div>

            <h1 className= 'font-semibold tracking-widest '>{name}</h1>
        </div>
    )
}
