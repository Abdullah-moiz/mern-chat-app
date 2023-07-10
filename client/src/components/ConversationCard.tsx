import React from 'react'
import { useDispatch } from 'react-redux'
import { setChatSelected } from '../slices/chatSlice'

export default function ConversationCard() {
    const dispatch = useDispatch()



    return (
        <div onClick={() => dispatch(setChatSelected(true))} className='md:w-11/12 w-full h-20 bg-gray-50 my-2 flex items-center cursor-pointer rounded px-4 mx-4 hover:bg-indigo-600 hover:text-white justify-start  transition-all duration-700'>
            <div className="avatar mx-4 placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                    <span className="text-xs">AA</span>
                </div>
            </div>

            <h1 className= 'font-semibold tracking-widest '>Abdullah moiz</h1>
        </div>
    )
}
