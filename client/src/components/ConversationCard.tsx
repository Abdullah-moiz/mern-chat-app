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
        <div onClick={handleClick} className='md:w-11/12 w-full h-20 bg-gray-50 my-2 flex items-center cursor-pointer rounded px-4 mx-4 hover:bg-indigo-600 hover:text-white justify-start  transition-all duration-700'>
            <div className="avatar mx-4 placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                    <span className="text-xs">{name.substring(0,2)}</span>
                </div>
            </div>

            <h1 className= 'font-semibold tracking-widest '>{name}</h1>
        </div>
    )
}
